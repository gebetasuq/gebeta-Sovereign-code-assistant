# Testing Guide

Gebeta Sovereign Code Assistant includes comprehensive test suites for all three starter templates.

## Prerequisites

- Python 3.11+ (for FastAPI)
- Node.js 20+ (for React)
- JDK 17+ (for Spring Boot)
- Docker (for Spring Boot Testcontainers)

## FastAPI Tests

```bash
cd templates/fastapi-service-template
pip install -r requirements.txt
pytest tests/ -v --cov=app --cov-report=html
```

Coverage report: htmlcov/index.html

React Tests

```bash
cd templates/react-frontend-template
npm install
npm test -- --coverage
```

Coverage report: coverage/index.html

Spring Boot Tests

```bash
cd templates/springboot-service-template
./mvnw clean test jacoco:report
```

If ./mvnw is not available, use mvn clean test jacoco:report (requires Maven installed).

Coverage report: target/site/jacoco/index.html

CI Integration

All tests run automatically on every push and pull request via GitHub Actions (see .github/workflows/test.yml).

Coverage Thresholds

Template Minimum Coverage
FastAPI 80%
React 80%
Spring Boot 80%

Pull requests that decrease coverage below these thresholds will be flagged.

---

Part of Gebeta Sovereign Code Assistant
