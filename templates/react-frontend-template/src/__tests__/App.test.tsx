/**
 * Tests for React frontend application.
 * Follows Gebeta Sovereign Coding Rules:
 * - Quality: Small, focused test functions with clear descriptions
 * - Security: No hardcoded secrets or sensitive data
 * - API Design: Consistent mocking patterns
 * 
 * Test coverage:
 * - Routing based on authentication state
 * - Login form validation and submission
 * - Successful login redirect
 * - Failed login error handling
 * - Logout flow
 * - Loading states during authentication
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import api from '../services/api';

// Mock API service
vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    interceptors: {
      request: { use: vi.fn(), eject: vi.fn() },
      response: { use: vi.fn(), eject: vi.fn() },
    },
  },
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('App Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('Authentication Flow - Routing', () => {
    it('redirects to login page when no token is present', () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      
      // Use flexible text matcher for login heading
      const loginHeading = screen.getByText(/sign in|login/i);
      expect(loginHeading).toBeDefined();
    });

    it('shows dashboard when valid token is present', () => {
      localStorageMock.setItem('access_token', 'valid-token');
      
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      
      // Use role-based query for dashboard heading
      const dashboardHeading = screen.getByRole('heading', { name: /dashboard/i });
      expect(dashboardHeading).toBeDefined();
    });
  });

  describe('Login Form - Validation', () => {
    it('displays validation errors for empty fields', async () => {
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      
      const loginButton = screen.getByRole('button', { name: /login/i });
      await user.click(loginButton);
      
      const emailInput = screen.getByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      
      expect(emailInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('required');
    });

    it('accepts valid email and password input', async () => {
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      
      const emailInput = screen.getByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'StrongPass123!');
      
      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('StrongPass123!');
    });
  });

  describe('Login Form - Submission', () => {
    it('redirects to dashboard after successful login', async () => {
      const mockToken = 'new-token';
      const mockUser = { id: 1, email: 'test@example.com', full_name: 'Test User' };
      
      const mockPost = vi.mocked(api.post);
      const mockGet = vi.mocked(api.get);
      mockPost.mockResolvedValueOnce({ data: { access_token: mockToken } });
      mockGet.mockResolvedValueOnce({ data: mockUser });
      
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      
      const emailInput = screen.getByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'StrongPass123!');
      await user.click(loginButton);
      
      await waitFor(() => {
        const dashboardHeading = screen.getByRole('heading', { name: /dashboard/i });
        expect(dashboardHeading).toBeDefined();
      });
    });

    it('shows error message on failed login (invalid credentials)', async () => {
      const mockPost = vi.mocked(api.post);
      mockPost.mockRejectedValueOnce({ 
        response: { status: 401, data: { detail: 'Invalid email or password' } } 
      });
      
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      
      const emailInput = screen.getByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });
      
      await user.type(emailInput, 'wrong@example.com');
      await user.type(passwordInput, 'WrongPass123!');
      await user.click(loginButton);
      
      await waitFor(() => {
        // Flexible error message matcher
        const errorMessage = screen.getByText(/invalid|failed|error/i);
        expect(errorMessage).toBeDefined();
      });
      
      // Should still be on login page
      const loginHeading = screen.getByText(/sign in|login/i);
      expect(loginHeading).toBeDefined();
    });

    it('shows error message on network failure', async () => {
      const mockPost = vi.mocked(api.post);
      mockPost.mockRejectedValueOnce(new Error('Network Error'));
      
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      
      const emailInput = screen.getByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'StrongPass123!');
      await user.click(loginButton);
      
      await waitFor(() => {
        const errorMessage = screen.getByText(/network|connection|error/i);
        expect(errorMessage).toBeDefined();
      });
    });

    it('shows loading state during login submission', async () => {
      // Create a promise that resolves after a delay
      let resolveLogin: (value: unknown) => void;
      const loginPromise = new Promise((resolve) => {
        resolveLogin = resolve;
      });
      
      const mockPost = vi.mocked(api.post);
      mockPost.mockReturnValue(loginPromise);
      
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      
      const emailInput = screen.getByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'StrongPass123!');
      await user.click(loginButton);
      
      // Check for loading indicator
      const loadingIndicator = screen.getByText(/loading|signing in/i);
      expect(loadingIndicator).toBeDefined();
      
      // Resolve the login promise
      resolveLogin!({ data: { access_token: 'token' } });
      
      await waitFor(() => {
        expect(screen.queryByText(/loading|signing in/i)).toBeNull();
      });
    });
  });

  describe('Logout Flow', () => {
    it('logs out and redirects to login page', async () => {
      // Set up authenticated state
      localStorageMock.setItem('access_token', 'valid-token');
      
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      
      // Verify on dashboard
      const dashboardHeading = screen.getByRole('heading', { name: /dashboard/i });
      expect(dashboardHeading).toBeDefined();
      
      // Find and click logout button
      const logoutButton = screen.getByRole('button', { name: /logout/i });
      await user.click(logoutButton);
      
      // Verify redirected to login
      await waitFor(() => {
        const loginHeading = screen.getByText(/sign in|login/i);
        expect(loginHeading).toBeDefined();
      });
      
      // Verify token removed
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('access_token');
    });
  });
});