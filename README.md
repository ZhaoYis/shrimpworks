# OpenClaw ShrimpWorks

Enterprise SaaS Factory Platform - An AI-powered automation platform for building SaaS products.

## Overview

ShrimpWorks is a comprehensive platform that leverages AI agents and workflow automation to rapidly build and deploy SaaS products. It combines task management, agent orchestration, and execution engines to automate the entire software development lifecycle.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Web Console (Next.js)                     │
│    Dashboard │ Projects │ Tasks │ Agents │ Org Settings         │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API Gateway (NestJS)                      │
│    Auth │ Projects │ Tasks │ Agents │ Workflows │ Org           │
└─────────────────────────────────────────────────────────────────┘
                                │
            ┌───────────────────┼───────────────────┐
            ▼                   ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Task Engine    │ │   Agent Engine   │ │ Execution Engine │
│   (packages/)    │ │   (packages/)    │ │   (packages/)    │
└──────────────────┘ └──────────────────┘ └──────────────────┘
            │                   │                   │
            └───────────────────┼───────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Worker Service (BullMQ)                       │
│         Task Queue │ Agent Queue │ Workflow Queue                │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   PostgreSQL     │ │      Redis       │ │   AI Providers   │
│   (Prisma)       │ │   (Queue/BullMQ) │ │  (Anthropic/etc) │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

## Project Structure

```
shrimpworks/
├── apps/
│   ├── api/          # NestJS Backend API
│   ├── web/          # Next.js Frontend
│   └── worker/       # BullMQ Worker Service
├── packages/
│   ├── core/         # Shared utilities, types, constants
│   ├── agents/       # AI Agent definitions and engine
│   ├── workflows/    # Workflow definitions and orchestration
│   ├── tasks/        # Task system and management
│   └── execution/    # Execution engine and runners
├── prisma/           # Database schema and migrations
├── docker/           # Docker configuration files
└── .claude/          # AI development guidelines
```

## Tech Stack

### Backend
- **Framework**: NestJS 10
- **Database**: PostgreSQL with Prisma ORM
- **Queue**: Redis with BullMQ
- **Auth**: JWT with Passport

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **State**: React Query + Zustand

### AI & Automation
- **LLM**: Anthropic Claude (primary), OpenAI (alternative)
- **Agents**: 18 specialized AI agents
- **Workflows**: DAG-based workflow engine

## Quick Start

### Prerequisites
- Node.js >= 20.0.0
- pnpm >= 8.0.0
- PostgreSQL 15+
- Redis 7+

### Installation

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Start development servers
pnpm dev
```

### Services

| Service | Port | Description |
|---------|------|-------------|
| Web | 3000 | Next.js frontend |
| API | 3001 | NestJS backend |
| Worker | - | BullMQ worker (no port) |
| Prisma Studio | 5555 | Database GUI |

## Available Scripts

```bash
# Development
pnpm dev              # Start all services
pnpm dev:api          # Start API only
pnpm dev:web          # Start web only
pnpm dev:worker       # Start worker only

# Build
pnpm build            # Build all packages and apps

# Database
pnpm db:migrate       # Run migrations
pnpm db:generate      # Generate Prisma client
pnpm db:studio        # Open Prisma Studio
pnpm db:seed          # Seed database

# Quality
pnpm lint             # Lint all packages
pnpm test             # Run all tests
```

## AI Agents

ShrimpWorks includes 18 specialized AI agents:

### Project Management
1. **Project Manager Agent** - Overall project coordination
2. **Product Manager Agent** - Product requirements and roadmap
3. **Scrum Master Agent** - Agile process management

### Development
4. **Architect Agent** - System architecture design
5. **Frontend Developer Agent** - UI/UX implementation
6. **Backend Developer Agent** - API and services
7. **Full Stack Developer Agent** - End-to-end features
8. **DevOps Engineer Agent** - Infrastructure and deployment
9. **QA Engineer Agent** - Testing and quality assurance

### Data & AI
10. **Data Engineer Agent** - Data pipelines and ETL
11. **Data Scientist Agent** - Analytics and ML models
12. **AI/ML Engineer Agent** - AI model development

### Design & UX
13. **UI/UX Designer Agent** - User experience design
14. **Technical Writer Agent** - Documentation

### Security & Operations
15. **Security Engineer Agent** - Security audit and compliance
16. **SRE Agent** - Site reliability engineering

### Specialized
17. **Code Reviewer Agent** - Code quality and reviews
18. **Prompt Engineer Agent** - AI prompt optimization

## Development Phases

1. **Phase 1**: Core infrastructure and basic modules
2. **Phase 2**: Database schema and migrations
3. **Phase 3**: Task system implementation
4. **Phase 4**: AI Agents implementation
5. **Phase 5**: Execution engine
6. **Phase 6**: SaaS Factory workflow
7. **Phase 7**: Web console completion
8. **Phase 8**: Auto-deployment system

## License

MIT License - See LICENSE file for details.
