# Imagination Labs Exam Project

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

### Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd imagination-labs-exam
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your database credentials and other configuration.

4. **Database Setup**
   ```bash
   npx prisma migrate dev
   # or if you're using another ORM
   npm run migration:run
   ```

5. **Start the development server**
   ```bash
   npm run start:dev
   # or
   yarn start:dev
   ```

## Project Structure

```
src/
├── main.ts                  # Application entry point
├── app.module.ts            # Root module
├── controllers/             # API endpoints
├── services/                # Business logic
├── dto/                     # Data transfer objects
├── entities/                # Database models
├── utils/                   # Utility functions and helpers
├── middleware/              # Custom middleware
└── config/                  # Configuration files
```

## Development Patterns

### Adding New Features

1. **Create DTOs** in the `dto/` directory for request/response data validation
2. **Define Entities** in the `entities/` directory if needed
3. **Implement Service** in the `services/` directory with business logic
4. **Create Controller** in the `controllers/` directory with endpoints
5. **Register** in the appropriate module

### Utility Functions

Reusable utility functions are located in the `utils/` directory and can be imported directly where needed without module registration.

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## API Documentation

Once the server is running, visit `http://localhost:3000/api` to access the Swagger documentation.

## Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)