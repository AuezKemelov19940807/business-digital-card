# Business Digital Card API

Backend API for a digital business card platform.

The application provides a GraphQL API for managing personal information, work experience, achievements, projects, technology stacks, and client reviews. It also supports file uploads using S3-compatible object storage.

## Tech Stack

- **TypeScript**
- **NestJS**
- **GraphQL**
- **Prisma ORM**
- **CockroachDB**
- **S3**
- **Docker**
- **Git**

## Features

- 👤 Personal information
- 💼 Work experience
- 🏆 Achievements
- 🚀 Projects
- 🛠️ Technology stacks
- ⭐ Client reviews
- 🔗 Project ↔ Tech Stack relationships
- 🖼️ S3 file uploads
- 🔍 GraphQL queries and mutations
- 🗄️ Prisma migrations

## API

The production API is deployed on Fly.io:

**API:** https://business-digital-card.fly.dev/

**GraphQL:** https://business-digital-card.fly.dev/graphql

## GraphQL

The API uses GraphQL for queries and mutations.

Example query:

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

Example mutation:

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

Main entities:

- `Hero`
- `Experience`
- `Achievement`
- `Project`
- `TechStack`
- `ProjectTechStack`
- `Review`

### Project ↔ TechStack

Projects and technologies have a many-to-many relationship.

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

For example:

```text
Business Digital Card
├── TypeScript
├── NestJS
├── GraphQL
├── Prisma
└── CockroachDB
```

## S3 Uploads

The application uses S3-compatible storage for uploaded images and files.

The API generates presigned URLs that allow the client to upload files directly to S3.

Example:

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
S3_SECRET_KEY="your-secret-key"
S3_BUCKET="your-bucket"
```

Do not commit `.env` to the repository.

## Installation

```bash
git clone <repository-url>
cd business-digital-card
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

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Production:

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

## Author

**Business Digital Card**

Backend application built with **TypeScript, NestJS, GraphQL, Prisma and CockroachDB**.
