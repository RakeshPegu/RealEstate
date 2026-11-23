# 0001. Foundational Web Stack and Architecture

**Date**: 2026-11-01
**Status**: Proposed

## Summary

This decision defines the foundational technology stack for the Real Estate Property and Sales Management Platform. We choose Next.js App Router with TypeScript, PostgreSQL hosted on Neon, Prisma ORM, Clerk for authentication, Inngest for durable background email workflows, and Tailwind CSS v4 with shadcn ui for styling. This gives our team high developer productivity, fast search engine indexing for public property listings, and reliable multi day automated follow up sequences without operating custom server infrastructure.

## Context

The Real Estate Property and Sales Management Platform serves three core user groups with distinct needs. Public buyers need fast, responsive property listing pages with clean search engine optimization and media galleries. Sales representatives need a secure, interactive dashboard to manage leads, track follow up tasks, and schedule property visits. Administrators need employee role management and executive analytics.

Additionally, the system requires automated transactional and multi day email sequences powered by Resend (basis: scope specification). These sequences include initial enquiry receipts, scheduled reminders at 1 day, 3 day, and 7 day intervals, and site visit notifications that must halt if a lead books an appointment or opts out. 

Choosing a fragmented or overly complex stack with multiple independent microservices would create high operational overhead for a small engineering team (basis: monolith first pattern). Conversely, choosing a pure client side Single Page Application would impair search engine discoverability for property listings and complicate database security. The chosen architecture must deliver unified development across public and authenticated portals, strong relational data integrity for CRM entities, and durable asynchronous execution.

## Options considered

### Option 1: Modern Serverless TypeScript Monolith (Next.js, Neon Postgres, Prisma, Clerk, Inngest, Vercel)

A unified Next.js App Router application in TypeScript deployed to Vercel. Database storage runs on serverless PostgreSQL through Neon with Prisma ORM for schema definition and type safe queries. User authentication and role access are handled by Clerk. Background tasks and multi day email sequences are managed by Inngest durable step functions invoking the Resend API. UI components are built using Tailwind CSS v4 and shadcn ui primitives. Media assets are processed and delivered via Cloudinary.

**Pros**:
- Single repository and deployment unit with zero custom server maintenance (basis: boring technology pattern)
- Server Components deliver pre rendered HTML for fast public search engine visibility
- Inngest handles delayed email execution, automatic retries, and cancellation events without dedicated Redis worker instances (basis: durable execution pattern)
- Clerk provides turnkey session management, role based metadata, and user invitation flows

**Cons**:
- Prisma query engine adds a small cold start latency overhead in serverless runtimes compared to raw SQL drivers
- Clerk introduces external vendor dependence for core identity management

### Option 2: Container Monolith on Railway (Remix, Self Hosted Postgres, Auth.js, BullMQ, Cloudflare R2)

A containerized Node.js application using Remix or React Router v7 deployed to Railway. Persistence uses a dedicated container running PostgreSQL. Authentication uses Auth.js with database sessions. Asynchronous tasks run on BullMQ backed by a Redis container. Media files are stored in Cloudflare R2 object storage.

**Pros**:
- Lower recurring third party subscription costs due to self hosted authentication and queue components
- Long running Node.js server process avoids serverless execution timeouts and cold starts

**Cons**:
- Engineering team must configure and maintain Redis queues, worker processes, and connection pooling
- Auth.js requires custom implementation of sales and admin role access control and invitation workflows
- Operational burden increases with manual database backups, container health monitoring, and scaling policies

### Option 3: Backend as a Service with Next.js (Next.js, Supabase Database and Auth, Inngest, Vercel)

A Next.js application leveraging Supabase for PostgreSQL, database authentication, and file storage. Row Level Security policies enforce data access at the database level. Background email sequences still run on Inngest since Supabase pg_cron lacks complex multi step workflow cancellation logic.

**Pros**:
- Database, authentication, and file storage originate from a single coordinated platform
- Database dashboard provides rapid visual data inspection for operators

**Cons**:
- Row Level Security policies create duplicate authorization logic across database SQL and application Server Actions
- Migrating auth or storage away from Supabase later requires extensive refactoring across client and server layers

## Decision

**Chosen option**: Option 1: Modern Serverless TypeScript Monolith (Next.js App Router, Neon Postgres, Prisma ORM, Clerk, Inngest, Cloudinary, Vercel).

We adopt a unified Next.js App Router application deployed on Vercel, paired with Neon serverless PostgreSQL, Prisma ORM, Clerk authentication, Inngest workflow orchestration, Cloudinary media storage, and Tailwind CSS v4 with shadcn ui.

**Implementation skills**: `nextjs-app-router-patterns` (`wshobson/agents`, `.agents/skills/nextjs-app-router-patterns/`), `prisma-client-api` (`prisma/skills`, `.agents/skills/prisma-client-api/`), `clerk-nextjs-patterns` (`clerk/skills`, `.agents/skills/clerk-nextjs-patterns/`), `inngest-durable-functions` (`inngest/inngest-skills`, `.agents/skills/inngest-durable-functions/`), `tailwind-v4-shadcn` (`secondsky/claude-skills`, `.agents/skills/tailwind-v4-shadcn/`)

## Rationale

Option 1 provides the optimal balance of developer velocity, operational simplicity, and architectural fit for the platform requirements. Next.js App Router allows public property catalog pages to render via React Server Components for superior search engine optimization while enabling protected sales dashboard routes to execute server mutations securely via Server Actions.

Neon serverless Postgres gives the team relational data integrity for complex property, lead, and appointment entities with zero database server patching or manual connection pooling. Prisma ORM guarantees strict type safety across database queries, preventing runtime schema mismatches. Clerk eliminates the security hazards and engineering drain of writing custom authentication, password reset, and session rotation logic, while supporting administrative employee management out of the box.

For asynchronous workflows, Inngest solves the difficult problem of multi day email sequences (1 day, 3 day, and 7 day follow ups) without requiring a continuously running Redis worker fleet. Its durable step execution allows workflows to sleep for days and pause or cancel instantly when a customer books a visit or responds to an email (basis: durable workflow state machine).

## Proposed stack

| Layer | Choice | Reason |
|---|---|---|
| Language | TypeScript 5.x | Strict type safety across client UI, server actions, and database schemas |
| Framework | Next.js 15 (App Router, React 19) | Server Components for SEO property catalog and Server Actions for dashboard mutations |
| Primary DB | PostgreSQL via Neon | Serverless relational storage with automatic pooling and database branching |
| ORM | Prisma ORM | Declarative schema modeling, automatic migrations, and generated type safe client |
| Auth | Clerk | Secure hosted sessions, prebuilt login UI, and role based access for sales and admins |
| Background jobs | Inngest | Durable step functions with step.sleep and event based sequence cancellation |
| Email service | Resend with React Email | Deliverability focused email API with JSX based template authoring |
| Media storage | Cloudinary | Automatic image optimization, WebP delivery, and responsive thumbnail generation |
| UI & Styling | Tailwind CSS v4 & shadcn ui | Accessible unstyled primitives with high density theme customization |
| Form validation | Zod & React Hook Form | Shared type safe schema validation across client forms and server actions |
| Search | PostgreSQL Full Text Search | Native database text indexing and filters without external search cluster overhead |
| Hosting | Vercel | Native zero configuration hosting for Next.js App Router with automatic edge routing |
| Observability | Sentry for Next.js | Unified error tracking across server components, server actions, and browser crashes |

## Consequences

**Positive**:
- Fast time to market with zero server infrastructure to provision or patch
- Unified TypeScript codebase spanning database schemas, backend mutations, and UI components
- Reliable multi day email sequence orchestration with built in event driven cancellation
- High search engine discoverability for property listings via server rendered HTML

**Negative / tradeoffs**:
- Recurring software as a service costs for Clerk and Inngest as user and event volumes expand
- Serverless cold starts can introduce minor latency spikes on infrequently visited routes
- Deep integration with Vercel and Clerk creates platform coupling that requires conscious migration planning if self hosting is needed later

**Neutral**:
- Team members must learn Next.js App Router caching semantics and Inngest event driven conventions
- Database schema changes require Prisma migration scripts and local environment synchronization

## Follow-up

- [ ] Capture framework, ORM, auth, and queue conventions into root `AGENTS.md` and relevant area context files during the tooling setup phase
- [ ] Initialize the Next.js scaffold with TypeScript, Prisma, Tailwind CSS v4, and shadcn ui
- [ ] Connect optional MCP servers (Neon, Vercel, Sentry) in developer tooling if live database and deployment inspections are desired

## References

**Project sources**:
- `docs/scope/scope.md`: Feature 1 specification and platform architecture requirements
- `skills-lock.json`: Installed community skills for Next.js, Prisma, Clerk, Inngest, and Tailwind CSS

**Practices & standards**:
- Monolith first pattern for early stage web platforms
- Boring technology principle for operational reliability
- Durable execution pattern for distributed background workflows
- Idempotency key pattern for external email and webhook deliveries

**Links**:
- Inngest Next.js integration guide: https://inngest.com
- Neon serverless PostgreSQL documentation: https://neon.tech
- Prisma ORM documentation: https://prisma.io
- Clerk authentication documentation: https://clerk.com
- Resend email documentation: https://resend.com

