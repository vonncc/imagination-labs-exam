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
├── users/                   # Users resource
│   ├── dto/                 # Data transfer objects
│   ├── entities/            # Entity definitions
│   ├── users.controller.ts  # Controller
│   ├── users.service.ts     # Service
│   └── users.module.ts      # Module
├── interfaces/              # Interfaces and types
├── repositories/            # Repository implementations
├── utils/                   # Utility functions and helpers
├── middleware/              # Custom middleware
└── config/                  # Configuration files
```

## Adding New Resources

To create a new resource, use the NestJS CLI:

```bash
nest g resource resource-name
```

## Development Patterns

### Adding New Features

1. **Define Interfaces** in the `interfaces/` directory
2. **Create DTOs** in the appropriate module's `dto/` directory
3. **Implement Repository** in the `repositories/` directory for data access
4. **Implement Service** in the module's service file with business logic
5. **Create Controller** in the module's controller file with endpoints
6. **Register** components in the appropriate module file

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