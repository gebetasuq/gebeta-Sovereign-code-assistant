# Example Agent Prompts

## Getting Started

Once you have Continue in Agent Mode, try these prompts.

## Code Generation

### Basic Function

```

@agent Create a Python function that validates an email address using regex

```

### REST API Endpoint

```

@agent Create a FastAPI endpoint for user login that:

· Accepts email and password
· Validates credentials against database
· Returns JWT token on success
· Returns 401 on failure

```

### Full Service

```

@agent Create a complete user service with:

· User model (email, hashed_password, created_at)
· Registration endpoint
· Login endpoint
· Profile endpoint (authenticated)
· SQLite database
· Unit tests for all endpoints

```

## Code Refactoring

### Improve Existing Code

```

@agent Refactor the function calculate_total() in /src/pricing.py to:

· Use early returns
· Extract validation logic into separate function
· Add type hints

```

### Extract Interface

```

@agent Extract an interface from the PaymentProcessor class in /src/payment.py

```

## Testing

### Generate Tests

```

@agent Write unit tests for the function validate_email() in /src/utils.py
Cover:

· Valid email formats
· Invalid email formats
· Empty string
· Edge cases

```

### Coverage Analysis

```

@agent Analyze test coverage for /src/auth/ and identify untested paths

```

## Documentation

### Generate Docstrings

```

@agent Add Google-style docstrings to all functions in /src/api/handlers.py

```

### Explain Code

```

@agent Explain what the function process_transaction() does in /src/ledger.py
Include:

· Purpose
· Parameters
· Return value
· Edge cases
· Example usage

```

## Code Review

### Review Changes

```

@agent Review the changes in the current git diff for:

· Security issues (hardcoded secrets, injection risks)
· Style violations (PEP 8)
· Missing error handling
· Test coverage gaps

```

### Architecture Check

```

@agent Check if the code in /src/services/ follows the repository pattern as defined in .continue/rules/gebeta-rules.md

```

## Debugging

### Find Bug

```

@agent The login endpoint sometimes returns a 500 error. Analyze /src/auth/login.py and suggest potential causes.

```

### Performance Analysis

```

@agent Identify performance bottlenecks in /src/reports/generator.py
Suggest optimizations.

```

## Database Operations

### Schema Generation

```

@agent Generate SQLAlchemy models for:

· User (id, email, password_hash, created_at)
· Product (id, name, price, stock_quantity)
· Order (id, user_id, product_id, quantity, order_date)

```

### Migration

```

@agent Create an Alembic migration to add a 'status' column to the orders table

```

## DevOps

### Docker Configuration

```

@agent Create a Dockerfile for a FastAPI application that:

· Uses Python 3.11
· Installs dependencies from requirements.txt
· Exposes port 8000
· Runs with uvicorn

```

### CI/CD Pipeline

```

@agent Create a GitHub Actions workflow that:

· Runs tests on push to main
· Builds Docker image
· Pushes to registry (optional, ask for approval)

```

## Security

### Secrets Check

```

@agent Scan the current directory for:

· Hardcoded API keys
· Database passwords
· Private keys
· .env files that should be in .gitignore

```

### Input Validation

```

@agent Review all API endpoints in /src/api/ for input validation vulnerabilities

```

---

## Tips for Better Results

| Tip | Example |
|-----|---------|
| Be specific | "Create a FastAPI endpoint" vs "Create an API" |
| List requirements | "Include JWT tokens, rate limiting, and logging" |
| Reference rules | "Follow the rules in .continue/rules/gebeta-rules.md" |
| Break down large tasks | Split "Build a microservice" into smaller prompts |
| Review before approving | Always review agent's proposed changes |

---

**Last updated:** April 2026
```
