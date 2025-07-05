<img src="https://github.com/user-attachments/assets/e6416610-a4f7-4722-9e36-27fe24be963c" alt="OpenEdit - The open source Premiere Pro alternative" width="1500" >

## Getting Started

To get OpenEdit up and running on your local machine, follow these steps:


### Prerequisites

Ensure you have the following installed:

- **Bun**: A fast JavaScript runtime, package manager, bundler, and test runner.
  - [Installation Guide](https://bun.sh/docs/installation)

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/just-moh-it/openedit.git
   cd openedit
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Change directory**:
   ```bash
   cd apps/web
   ```

4. **Setup database**:

We use Drizzle ORM for database migrations and a postgres-compatible database schema for our database. Please use supabase or connect to a local postgres database and keep the connection url for the next step.

5. **Setup environment variables**:
   ```bash
   cp .env.example .env
   ```

If you're still facing issues, please refer to [server-env.ts](./apps/web/src/lib/env/server.ts) and [client-env.ts](./apps/web/src/lib/env/client.ts) to see the required environment variables.


6. **Run the database migrations**:
   ```bash
   bun db:migrate
   ```

7. **Run the development server**:
   ```bash
   bun dev 
   ```

The web application will be accessible at [http://localhost:3001](http://localhost:3001).

## Tech Stack

- **TypeScript** - For type safety and improved developer experience
- **TanStack Start** - SSR framework with TanStack Router
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Node.js** - Runtime environment
- **Turborepo** - Optimized monorepo build system
- **Biome** - Linting and formatting
- **Husky** - Git hooks for code quality

## Features

WIP.

## Roadmap

WIP.

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute to this project.
