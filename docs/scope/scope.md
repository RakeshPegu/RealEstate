# Scope: Real Estate Property & Sales Management Platform

A unified real estate platform providing a public property showcase, a sales team dashboard, an admin operations portal, and automated Resend email workflows.

**Build approach:** Tracer Bullet (vertical slices built end to end through database, backend, and user interface).
**Workflow:** Beta (after develop, check verify then test). The project default level of rigor. `/architect` is the recommended first stop for a feature with a real decision, but skippable when you already know the build. Any feature can carry its own tag (e.g. `· GA`) to do more or less.

_These are recommendations to keep your build orderly, not requirements. Skip anything that does not fit: if you already know how to build a feature, use `/develop` and skip `/architect`. You decide when a feature is `done`._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Stack & architecture | Foundation | in-progress |
| 2 | Coding standards & tooling | Foundation | planned |
| 3 | Data model | Foundation | planned |
| 4 | Design system & UI foundation | Foundation | planned |
| 5 | Core property enquiry loop | Slice 1 | planned |
| 6 | Property catalog & media management | Slice 2 | planned |
| 7 | Site visit booking & appointment lifecycle | Slice 3 | planned |
| 8 | Sales pipeline & follow up tasks | Slice 4 | planned |
| 9 | Automated email engine & enquiry sequence | Slice 5 | planned |
| 10 | Site visit email reminder sequence | Slice 6 | planned |
| 11 | Employee management & admin analytics | Slice 7 | planned |

## Foundations

### 1. Stack & architecture
Choose the core web framework, runtime, database, background job runner, and component library, then initialize a clean runnable project.
**Done when:** the stack decision is recorded in an architecture spec and the scaffold boots locally with database connectivity.
spec [0001](../specs/0001-stack-and-architecture.md)
- [x] Decide the stack (spec): `/architect stack & architecture`
- [ ] Scaffold from the decision: `/develop stack & architecture`
- [ ] Verify it: `/check verify stack & architecture`
- [ ] Test it: `/test stack & architecture`

### 2. Coding standards & tooling
Capture development rules into root `AGENTS.md` and install code quality tools from the real project scaffold.
**Done when:** root `AGENTS.md` documents coding patterns, and linting, formatting, and type checks run clean.
- [ ] Capture conventions + tooling choices: `/audit`
- [ ] Install the tooling: `/develop tooling`
- [ ] Check it runs clean: `/test`

### 3. Data model · needs a decision
Define core relational schemas for properties, media assets, user accounts, roles, leads, site visits, follow up tasks, and email logs.
**Done when:** database tables, foreign keys, status enumerations, indexes, and constraints support all platform workflows without breaking migrations.
- [ ] Design it (spec): `/architect data model`

### 4. Design system & UI foundation · needs a decision
Establish design tokens, accessible color palettes, layout shells for public and dashboard portals, and base components.
**Done when:** `design.md` defines typography, colors, and responsive layout shells for both public and authenticated views with keyboard navigation.
- [ ] Design it (spec): `/architect design system & UI foundation`

## Slice 1: Core property enquiry loop

### 5. Core property enquiry loop · needs a decision
Connect the whole pipeline end to end with an admin publishing a single listing, a public customer submitting an enquiry without an account, and a sales rep viewing the created lead.
**Done when:** a published property displays publicly, an enquiry form submission creates a database lead, and an authenticated sales rep sees that lead in their dashboard.
- [ ] Design it (spec): `/architect core property enquiry loop`

## Slice 2: Property catalog & media management

### 6. Property catalog & media management · needs a decision
Provide admin property creation and editing with direct cloud image storage, together with a public property showcase featuring search, multi criteria filters, and search engine optimization.
**Done when:** admins can create listings with uploaded and reordered photos, and public visitors can filter properties with instant results and valid structured metadata.
- [x] Design it (spec): `/architect property catalog & media management` – spec [0002](../specs/0002-property-catalog-media-management.md)

## Slice 3: Site visit booking & appointment lifecycle

### 7. Site visit booking & appointment lifecycle · needs a decision
Enable customers to request on site property visits with preferred dates, and allow sales representatives to confirm, reschedule, cancel, and log visit outcomes.
**Done when:** a visitor can submit a visit request without signing in, and sales reps can manage appointment states independently from lead status.
- [ ] Design it (spec): `/architect site visit booking & appointment lifecycle`

## Slice 4: Sales pipeline & follow up tasks

### 8. Sales pipeline & follow up tasks · needs a decision
Give sales representatives dedicated lead management views with status progression, interaction notes, scheduled follow ups, overdue alerts, and admin reassignment.
**Done when:** sales reps can update lead stages, schedule follow up tasks with due dates, view overdue alerts, and admins can reassign leads with activity audit logs.
- [ ] Design it (spec): `/architect sales pipeline & follow up tasks`

## Slice 5: Automated email engine & enquiry sequence

### 9. Automated email engine & enquiry sequence · needs a decision
Build the asynchronous job scheduler and Resend delivery engine that runs the enquiry acknowledgement and 1 day, 3 day, and 7 day follow up emails with cancellation rules and communication preferences.
**Done when:** immediate enquiry acknowledgements deliver, scheduled follow ups fire accurately, and active sequences cancel immediately when a lead requests a visit, responds, or opts out.
- [ ] Design it (spec): `/architect automated email engine & enquiry sequence`

## Slice 6: Site visit email reminder sequence

### 10. Site visit email reminder sequence · needs a decision
Automate appointment lifecycle communications with booking receipt notices, confirmation messages, 24 hour and 2 hour reminders, reschedule recalculation, cancellation cleanup, and post visit thank you notes.
**Done when:** visit confirmation sends appointment details, 24 hour and 2 hour reminders trigger on schedule, reschedules adjust reminder timing, and post visit thank you emails deliver upon completion.
- [ ] Design it (spec): `/architect site visit email reminder sequence`

## Slice 7: Employee management & admin analytics

### 11. Employee management & admin analytics · needs a decision
Allow administrators to invite, update, and deactivate sales employee accounts, and view executive metrics tracking enquiries, leads, visits, and team performance.
**Done when:** admins can manage employee credentials and role activation, and review dashboard charts showing enquiry volume, lead conversion rates, and sales rep activity.
- [ ] Design it (spec): `/architect employee management & admin analytics`

## Deferred
Out of scope for the current build pass, kept so the plan stays honest.
- **Instant mobile alerts**: WhatsApp or SMS notifications for sales representatives when hot leads arrive · needs a decision
- **Property engagement metrics**: public listing view counter and enquiry conversion rate calculations · needs a decision
- **Customer account portal**: optional buyer portal with saved searches and favorite property bookmarks · needs a decision
- **Multi agency tenancy**: organizational isolation, agency subscription billing, and white label branding · needs a decision

## Legend

**The decision box.** Every feature carries exactly one, the sub task whose label ends with `(spec)`. Its wording varies (`Design it (spec)` normally, `Decide the stack (spec)` on Stack & architecture), so skills locate it by that `(spec)` suffix, never by an exact label. Every other box is an execution box and `/architect` never ticks one.

**Feature lifecycle**: the scope updates as a feature moves; each row is what it shows and who sets it:

| State | Set by | The feature shows |
|---|---|---|
| `planned` · needs a decision | `/scope` | one box: `Design it (spec): /architect <feature>` |
| `in-progress` (designed) | **`/architect` at spec capture** | `Design it` ticked; spec linked; `Build it: /develop <feature>` + **2 to 5 milestones**; the tier closing boxes (`Verify it` Alpha+, `Test it` Beta+, `Review it` + `Document it` GA); any surfaced follow up enrolled |
| `in-progress` (building) | `/develop` | milestone sub boxes tick one by one; code pointer filled |
| `in-progress` (verified) | `/check verify` | `Build it` + milestones ticked; `Verify it` ticked |
| `done` | **you, when you decide it is** (any skill sets it when you say so); `/sync` reconciles | boxes you ran ticked, skipped ones marked skipped; the tier last stage (`Prototype` after `/develop`; `Alpha` after `/check verify`; `Beta`/`GA` after `/test`) is the suggested point to call it done; `/sync` captures conventions |

- **Next step** = the first unticked box (always a command or a tracked milestone).
- **needs a decision** = run `/architect` first; otherwise straight to `/develop` (or `/audit` for standards & tooling). The tag drops once the spec is captured.
- **Atomic build tasks live in the spec's `## Build plan`, not here**: the scope carries only the milestone rollup.
- **Status** `planned` to `in-progress` to `done`, plus `existing` (pre workflow) and `dropped` (de scoped, kept for history).
- **Approach tag** beside a heading (e.g. `· Facade`) overrides the project default for that feature; no tag = inherits it.
- **Workflow tier tag** beside a heading (e.g. `· GA`, `· Prototype`) sets that one feature rigor above or below the project default; no tag inherits the default. It decides the feature check boxes and each skill next suggestion.
- **Workflow** (header line) is the project default, what runs after `/develop`: **Prototype** = nothing (trust develop own build time self check); **Alpha** = `/check verify`; **Beta** = `/check verify` then `/test`; **GA** = adds a fresh model `/check review` then `/document`. A feature built on an unratified decision (an `Assumed` spec) stays flagged, but that never blocks `done`.
- **Pointer line** (`spec <n> · code in <path>`): the spec link added by `/architect`, the code path by `/develop`.

