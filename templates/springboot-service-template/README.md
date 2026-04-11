# Spring Boot Microservice Template

A production-ready Spring Boot template with REST APIs, security, and testing.

## Features

- Spring Boot 3.x
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL
- OpenAPI 3.0 (Swagger)
- Unit and integration tests
- Docker support
- Maven build

## Quick Start

```bash
# Create new service from template
cp -r templates/springboot-service-template /path/to/your-new-service

# Build and run
cd /path/to/your-new-service
./mvnw spring-boot:run
```

API Documentation

Once running, visit: http://localhost:8080/swagger-ui.html

Project Structure

```
springboot-service-template/
├── src/
│   ├── main/
│   │   ├── java/com/gebeta/service/
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   ├── model/
│   │   │   ├── dto/
│   │   │   ├── config/
│   │   │   └── SecurityConfig.java
│   │   └── resources/
│   │       ├── application.yml
│   │       └── db/migration/
│   └── test/
│       └── java/com/gebeta/service/
├── Dockerfile
├── docker-compose.yml
├── pom.xml
└── README.md
```

---

Part of Gebeta Sovereign Code Assistant

```
