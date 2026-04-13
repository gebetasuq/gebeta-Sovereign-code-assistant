import React, { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-md text-center">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Something went wrong</h1>
            <p className="mt-2 text-gray-600">{this.state.error?.message || 'An unexpected error occurred'}</p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 p-4 bg-gray-100 rounded text-left text-xs font-mono overflow-auto max-h-48">
                <summary className="cursor-pointer font-bold mb-2">Error Details (Dev Only)</summary>
                {this.state.error?.stack}
              </details>
            )}
            <button onClick={this.handleReset} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition">
              Try Again
            </button>
            <a href="/" className="block mt-3 text-blue-600 hover:text-blue-700 underline">Go to Dashboard</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}