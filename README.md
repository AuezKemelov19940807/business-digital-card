# Business Digital Card API

Backend API for a digital business card platform built with **NestJS, GraphQL, Prisma and CockroachDB**.

The application provides a GraphQL API for managing personal information, work experience, achievements, projects, technology stacks and client reviews. It also supports direct file uploads using **S3-compatible object storage**.

## Tech Stack

- **TypeScript**
- **NestJS**
- **GraphQL**
- **Prisma ORM**
- **CockroachDB**
- **S3-compatible storage**
- **Vitest**
- **Docker**
- **GitHub Actions**
- **Fly.io**

## Features

- 👤 Personal information
- 💼 Work experience
- 🏆 Achievements
- 🚀 Projects
- 🛠️ Technology stacks
- ⭐ Client reviews
- 🔗 Project ↔ Tech Stack many-to-many relationships
- 🖼️ S3-compatible file uploads
- 🔍 GraphQL queries and mutations
- 🗄️ Prisma migrations
- 🧪 Unit testing with Vitest
- ⚙️ Automated CI/CD with GitHub Actions
- 🐳 Dockerized production deployment
- ☁️ Production deployment on Fly.io

## API

The production API is deployed on Fly.io.

**API**

https://business-digital-card.fly.dev/

**GraphQL**

https://business-digital-card.fly.dev/graphql

## GraphQL

The API uses GraphQL for queries and mutations.

### Example Query

```graphql
query {
  projects {
    id
    title
    description
    image
    url
    github
    isFeatured
    techStacks {
      id
      name
    }
  }
}
```

### Example Mutation

```graphql
mutation {
  createProject(
    input: {
      title: "Business Digital Card"
      description: "Digital business card platform"
      isFeatured: true
      techStackIds: ["tech-stack-id-1", "tech-stack-id-2"]
    }
  ) {
    id
    title
    techStacks {
      id
      name
    }
  }
}
```

## Database

The project uses **CockroachDB** with **Prisma ORM**.

### Main Entities

- `Hero`
- `Experience`
- `Achievement`
- `Project`
- `TechStack`
- `ProjectTechStack`
- `Review`

### Project ↔ TechStack

Projects and technologies have a many-to-many relationship through `ProjectTechStack`.

```text
Project
   │
   │ many-to-many
   │
ProjectTechStack
   │
   │
TechStack
```

Example:

```text
Business Digital Card
├── TypeScript
├── NestJS
├── GraphQL
├── Prisma
└── CockroachDB
```

## S3 File Uploads

The application uses S3-compatible object storage for uploaded images and files.

Instead of sending files through the backend, the API generates **presigned URLs** that allow the client to upload files directly to object storage.

### Upload Flow

```text
Client
   │
   │ request presigned URL
   ▼
GraphQL API
   │
   │ generate presigned URL
   ▼
Client
   │
   │ direct upload
   ▼
S3 Storage
```

### Example Mutation

```graphql
mutation {
  createUploadUrl(
    input: {
      fileName: "avatar.jpg"
      contentType: "image/jpeg"
      folder: "reviews"
    }
  ) {
    uploadUrl
    key
  }
}
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL="your-cockroachdb-connection-string"

S3_ENDPOINT="your-s3-endpoint"
S3_REGION="your-region"
S3_ACCESS_KEY="your-access-key"
S3_SECRET_KEY="your-s3-secret-key"
S3_BUCKET="your-bucket"
```

Never commit `.env` or production credentials to the repository.

## Installation

Clone the repository:

```bash
git clone <repository-url>

cd business-digital-card
```

Install dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

## Database Migrations

Check migration status:

```bash
npx prisma migrate status
```

Run development migrations:

```bash
npx prisma migrate dev
```

Deploy existing migrations:

```bash
npx prisma migrate deploy
```

## Running Locally

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm run start
```

Local GraphQL endpoint:

```text
http://localhost:3000/graphql
```

Production GraphQL endpoint:

```text
https://business-digital-card.fly.dev/graphql
```

## Testing

The project uses **Vitest** for unit testing.

The test suite covers service and resolver logic, including:

- CRUD operations
- GraphQL queries and mutations
- Resolver-to-service interaction
- Not-found scenarios
- Prisma transaction logic
- GraphQL field resolvers

Run tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:coverage
```

Current test suite:

```text
17 test files
91 tests
```

## CI/CD

The project uses **GitHub Actions** for automated CI/CD.

Every push and pull request runs the CI checks:

1. Install dependencies
2. Generate Prisma Client
3. Run Vitest tests
4. Build the NestJS application

For pushes to `main`, a successful CI run automatically triggers deployment to Fly.io.

```text
Push / Pull Request
        │
        ▼
 GitHub Actions
        │
        ├── npm ci
        │
        ├── prisma generate
        │
        ├── npm run test
        │
        └── npm run build
                │
                ▼
          Tests & Build OK
                │
                ▼
          Deploy to Fly.io
```

### Deployment Rule

```text
Pull Request
     │
     ▼
 Test + Build
     │
     ▼
   No deploy
```

```text
Push to main
     │
     ▼
 Test + Build
     │
     ├── ❌ Failed → Deploy stopped
     │
     └── ✅ Success
            │
            ▼
        Fly.io Deploy
```

This prevents a broken build or failing test suite from being deployed to production.

## Docker

The application includes a production Dockerfile.

Build the Docker image:

```bash
docker build -t business-digital-card .
```

Run the container:

```bash
docker run -p 3000:3000 business-digital-card
```

The application runs on port `3000`.

## Project Structure

```text
src/
├── achievement/
├── experience/
├── project/
├── tech-stack/
├── review/
├── s3/
├── lib/
│   └── prisma.ts
└── main.ts
```

Each module follows a modular NestJS architecture:

```text
Module
├── resolver
├── service
├── dto
└── types
```

### Resolver

Handles GraphQL queries and mutations.

### Service

Contains business logic and Prisma database operations.

### DTO / Input

Defines and validates incoming GraphQL data.

### Type

Defines GraphQL response types.

## Validation

Input data is validated using `class-validator`.

Example:

```typescript
@IsString()
@IsNotEmpty()
@MaxLength(50)
title: string;
```

## API Modules

| Module        | Description               |
| ------------- | ------------------------- |
| `Project`     | Manage projects           |
| `TechStack`   | Manage technologies       |
| `Experience`  | Manage work experience    |
| `Achievement` | Manage achievements       |
| `Review`      | Manage client reviews     |
| `S3`          | Generate file upload URLs |

## Architecture

The application follows a modular backend architecture based on NestJS.

```text
GraphQL Client
      │
      ▼
   Resolver
      │
      ▼
    Service
      │
      ▼
    Prisma
      │
      ▼
 CockroachDB
```

File uploads use a separate direct-to-storage flow:

```text
Client
  │
  │ request presigned URL
  ▼
GraphQL API
  │
  │ generate URL
  ▼
Client
  │
  │ direct upload
  ▼
S3 Storage
```

## Deployment

The production application is deployed using **Docker and Fly.io**.

Deployment is automated through GitHub Actions.

```text
GitHub
   │
   │ push to main
   ▼
GitHub Actions
   │
   ├── Tests
   │
   ├── Build
   │
   └── Deploy
         │
         ▼
       Docker
         │
         ▼
      Fly.io
         │
         ▼
   Production API
```

The deployment uses a Fly.io application-scoped deploy token stored securely as a GitHub Actions secret.

## Production

**API**

https://business-digital-card.fly.dev/

**GraphQL**

https://business-digital-card.fly.dev/graphql

## Author

**Business Digital Card**

Backend application built with:

**TypeScript · NestJS · GraphQL · Prisma · CockroachDB · S3 · Vitest · Docker · GitHub Actions · Fly.io**
