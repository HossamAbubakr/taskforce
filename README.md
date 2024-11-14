
# Taskforce - Task Management Application

Taskforce is a full-stack task management application with a React frontend (built with Vite) and a Node.js/Express backend. The project uses Docker for containerization, with `docker-compose` to orchestrate the services, and PostgreSQL as the database, managed via Prisma ORM.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Environment Configuration](#environment-configuration)
3. [Docker Setup](#docker-setup)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [Swagger API Documentation](#swagger-api-documentation)

---

## Project Structure

```
root/
│
├── backend/                 # Backend Node.js/Express application
│   ├── Dockerfile           # Dockerfile for the backend
│   ├── src/                 # Source code for the backend
│   ├── prisma/              # Prisma ORM schema and migrations
│   └── ...                  # Additional backend files
│
├── frontend/                # Frontend React application (Vite)
│   ├── Dockerfile           # Dockerfile for the frontend
│   ├── src/                 # Source code for the frontend
│   └── ...                  # Additional frontend files
│
├── swagger-docs.yaml        # Swagger API documentation
└── docker-compose.yml       # Docker Compose file for multi-service orchestration
```

## Environment Configuration

### Backend Environment Variables

- `DATABASE_URL`: PostgreSQL connection string (`postgresql://<username>:<password>@<host>:<port>/<database_name>`)
- `TOKEN_SECRET`: Secret key for JWT signing.
- `TOKEN_EXPIRE`: JWT expiration period (e.g., `7d`).
- `PEPPER`: Password pepper for added security.
- `SALT_ROUNDS`: Number of salt rounds for bcrypt (e.g., `10`).
- `COOKIE_AGE`: Max age for cookies in milliseconds (e.g., `604800000` for 1 week).

Create a `.env` file in the `backend` directory and add these variables, filling in the placeholders as needed.

## Docker Setup

### Dockerfiles

- Each service (frontend and backend) has its own `Dockerfile` located in their respective folders (`frontend/Dockerfile` and `backend/Dockerfile`).

### Docker Compose

- The root `docker-compose.yml` file orchestrates both services, setting up a multi-container environment.

## Database Setup

1. Make sure you have a PostgreSQL database set up.
2. Update the `DATABASE_URL` in your backend `.env` file with your database credentials.
3. Run Prisma migrations to set up the database schema:

   ```bash
   docker-compose run backend npx prisma migrate dev
   ```

## Running the Application

With Docker Compose configured, start the entire stack (frontend, backend, and database) by running:

```bash
docker-compose up --build
```

This will build and start all services as defined in the `docker-compose.yml`.

## Swagger API Documentation

API documentation is available through Swagger. The `swagger-docs.yaml` file is located in the root directory. To view the documentation in a Swagger UI, use a service like [Swagger Editor](https://editor.swagger.io/) or integrate Swagger UI in the project.
