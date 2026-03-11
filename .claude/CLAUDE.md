# ShrimpWorks - AI Development Guide

This document provides guidance for AI assistants (Claude, etc.) working on the ShrimpWorks codebase.

## Project Overview

ShrimpWorks is an Enterprise SaaS Factory Platform - an AI-powered automation platform for rapidly building and deploying SaaS products. It uses 18 specialized AI agents and workflow automation to handle the entire software development lifecycle.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Web Console (Next.js)                     │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API Gateway (NestJS)                      │
└─────────────────────────────────────────────────────────────────┘
                                │
            ┌───────────────────┼───────────────────┐
            ▼                   ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Task Engine    │ │   Agent Engine   │ │ Execution Engine │
└──────────────────┘ └──────────────────┘ └──────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Worker Service (BullMQ)                       │
└─────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
shrimpworks/
├── apps/
│   ├── api/          # NestJS Backend (Port: 3001)
│   ├── web/          # Next.js Frontend (Port: 3000)
│   └── worker/       # BullMQ Worker Service
├── packages/
│   ├── core/         # Shared types, constants, utilities
│   ├── agents/       # AI Agent definitions and engine
│   ├── workflows/    # Workflow definitions and orchestration
│   ├── tasks/        # Task system and management
│   └── execution/    # Execution engine and runners
├── prisma/           # Database schema and migrations
└── docker/           # Docker configuration
```

## Technology Stack

### Backend
- **Framework**: NestJS 10
- **Database**: PostgreSQL 15 with Prisma ORM
- **Queue**: Redis with BullMQ
- **Auth**: JWT with Passport

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **State**: React Query + Zustand

### AI
- **LLM**: Anthropic Claude (primary)
- **Model**: claude-sonnet-4-6

## Development Commands

```bash
# Install dependencies
pnpm install

# Start all services in development
pnpm dev

# Start specific service
pnpm dev:api     # API only
pnpm dev:web     # Web only
pnpm dev:worker  # Worker only

# Database
pnpm db:generate  # Generate Prisma client
pnpm db:migrate   # Run migrations
pnpm db:studio    # Open Prisma Studio

# Build
pnpm build

# Testing
pnpm test
```

## Code Style Guidelines

### TypeScript
- Use strict type checking
- Prefer interfaces for object shapes
- Use type unions for limited options
- Avoid `any` - use `unknown` when type is truly unknown

### Naming Conventions
- **Files**: kebab-case (e.g., `task-manager.ts`)
- **Classes**: PascalCase (e.g., `TaskManager`)
- **Functions/Variables**: camelCase (e.g., `getTaskById`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `MAX_RETRIES`)
- **Database tables**: snake_case (e.g., `saas_products`)

### Module Structure
- Each module should have a single responsibility
- Export from `index.ts` for clean imports
- Use dependency injection in NestJS modules

## 18 AI Agents

The platform includes 18 specialized AI agents:

### Project Management
1. **PROJECT_MANAGER** - Planning, coordination, timeline management
2. **PRODUCT_MANAGER** - Requirements, roadmap, prioritization
3. **SCRUM_MASTER** - Agile processes, sprint management

### Development
4. **ARCHITECT** - System design, tech stack decisions
5. **FRONTEND_DEVELOPER** - UI implementation, React/Vue/Angular
6. **BACKEND_DEVELOPER** - API, database, microservices
7. **FULL_STACK_DEVELOPER** - End-to-end features
8. **DEVOPS_ENGINEER** - CI/CD, Docker, Kubernetes
9. **QA_ENGINEER** - Testing, automation, quality

### Data & AI
10. **DATA_ENGINEER** - ETL, pipelines, data warehouse
11. **DATA_SCIENTIST** - Analytics, ML models
12. **AI_ML_ENGINEER** - Machine learning, deep learning

### Design & Documentation
13. **UI_UX_DESIGNER** - User experience, wireframes
14. **TECHNICAL_WRITER** - Documentation, API docs

### Security & Operations
15. **SECURITY_ENGINEER** - Security audit, compliance
16. **SRE** - Reliability, monitoring, incidents

### Specialized
17. **CODE_REVIEWER** - Code quality, best practices
18. **PROMPT_ENGINEER** - LLM prompt optimization

## Database Models

Key Prisma models:
- `User` - Platform users
- `Org` - Organizations
- `Department` - Organization departments
- `Project` - SaaS projects
- `Task` - Project tasks
- `Agent` - AI agent configurations
- `Workflow` - Workflow definitions
- `Execution` - Workflow execution records
- `SaaSProduct` - Generated SaaS products
- `Notification` - User notifications

## Workflow System

Workflows are DAG-based orchestrations that:
1. Define steps with dependencies
2. Support multiple trigger types (MANUAL, SCHEDULED, EVENT, WEBHOOK)
3. Can include agents, tasks, conditions, and delays
4. Track execution state and logs

Example workflow for SaaS generation:
```
Requirements → Architecture → Database → API → Frontend → Testing → Deployment
```

## API Endpoints

### Auth
- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `GET /auth/profile` - Get current user

### Projects
- `GET /projects` - List projects
- `POST /projects` - Create project
- `GET /projects/:id` - Get project
- `PUT /projects/:id` - Update project

### Tasks
- `GET /tasks` - List tasks
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task

### Agents
- `GET /agents` - List agents
- `POST /agents` - Create agent config
- `PUT /agents/:id` - Update agent

### Workflows
- `GET /workflows` - List workflows
- `POST /workflows` - Create workflow
- `POST /workflows/:id/execute` - Execute workflow

## Environment Variables

Required environment variables (see `.env.example`):
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - JWT signing secret
- `ANTHROPIC_API_KEY` - Claude API key

## Development Phases

1. **Phase 1**: Core infrastructure (current)
2. **Phase 2**: Database schema and migrations
3. **Phase 3**: Task system implementation
4. **Phase 4**: AI Agents implementation
5. **Phase 5**: Execution engine
6. **Phase 6**: SaaS Factory workflow
7. **Phase 7**: Web console completion
8. **Phase 8**: Auto-deployment system

## Common Tasks

### Adding a new API endpoint
1. Create controller in `apps/api/src/modules/<module>/<module>.controller.ts`
2. Create service method in `apps/api/src/modules/<module>/<module>.service.ts`
3. Add DTOs for request/response validation
4. Update module to register controller/provider

### Adding a new agent type
1. Add type to `AgentType` enum in `prisma/schema.prisma`
2. Add definition in `packages/agents/src/definitions/index.ts`
3. Add capabilities mapping

### Creating a new workflow
1. Define steps in workflow configuration
2. Create workflow template in `packages/workflows/src/definitions/`
3. Register workflow with the engine

## Security Considerations

- Always validate input using class-validator
- Use JWT guards on protected routes
- Never expose sensitive data in API responses
- Use parameterized queries (Prisma handles this)
- Store secrets in environment variables

## Testing

- Unit tests should be co-located with source files
- Use Jest for testing
- Aim for high coverage on business logic
- Mock external dependencies

## Deployment

Use Docker Compose for local development:
```bash
docker-compose -f docker/docker-compose.yml up
```

For production:
1. Build Docker images
2. Push to container registry
3. Deploy to Kubernetes (recommended) or Docker Swarm
