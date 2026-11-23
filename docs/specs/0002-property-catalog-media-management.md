# 0002. Property catalog & media management

**Date**: 2026-11-03
**Status**: Proposed

## Summary

This spec defines the public property catalog page and the supporting media management. It introduces a `Property` data model with full listing details and a `Media` model for Cloudinary‑hosted images. The page displays properties, supports search by city and price range, and shows paginated results (12 per page). Admins can create and edit listings with image uploads stored in Cloudinary.

## Context

The platform needs a public showcase of real‑estate listings. Visitors should browse properties, filter by location and price, and view images. Admins require a simple workflow to upload images to Cloudinary and associate them with properties. Existing stack uses Next.js App Router, Prisma, Clerk, and Cloudinary credentials are already configured.

## Requirements

**User stories:**
- As a visitor, I want to browse a list of properties so that I can see available homes.
- As a visitor, I want to filter properties by city and price range so that I find homes within my budget.
- As a visitor, I want the list paginated (12 per page) so the page loads quickly.
- As an admin, I want to create a property with images so that it appears on the public catalog.
- As an admin, I want to edit a property and manage its images so that listings stay up to date.

**Acceptance criteria:**
- **AC-1**: Public `/properties` page shows a grid of property cards with title, price, address, and main image.
- **AC-2**: Search filter by city and price range returns matching properties.
- **AC-3**: Pagination displays 12 items per page with next/previous navigation.
- **AC-4**: Admin can create a property via `/admin/properties/new` with required fields and upload multiple images to Cloudinary; images are stored with `imageUrl`, `imagePublicId`, and `order`.
- **AC-5**: Admin can edit a property and reorder or delete images; changes reflect on the public page.
- **AC-6**: All image URLs are served securely via Cloudinary CDN.

## Options considered

### Option 1: Store images locally in the filesystem
- **Pros**: No external service, simpler setup.
- **Cons**: Limited scalability, no CDN, harder to manage backups, larger repo size.

### Option 2: Use Cloudinary for image storage (chosen)
- **Pros**: Scalable CDN, automatic optimizations, easy transforms, secure URLs, integrates with existing Cloudinary config.
- **Cons**: External dependency, requires API key management.

## Decision

**Chosen option**: Option 2: Cloudinary for image storage.

**Implementation skills**: None additional; uses existing Prisma client, Next.js API routes, and Cloudinary SDK.

## Rationale

Cloudinary provides a production‑grade image CDN that fits the platform’s need for fast, optimized media delivery. Local storage would quickly become a bottleneck as the catalog grows and would require custom caching and backup solutions. The existing `.env` already contains Cloudinary credentials, so no new secret management is needed.

## Feature design

**Data model sketch:**
```prisma
model Property {
  id          String   @id @default(cuid())
  title       String
  price       Int
  address     String
  city        String
  state       String
  zip         String
  bedrooms    Int
  bathrooms   Int
  squareFeet  Int
  listingDate DateTime @default(now())
  media       Media[]
}

model Media {
  id            String @id @default(cuid())
  imageUrl      String
  imagePublicId String
  order         Int
  propertyId    String
  property      Property @relation(fields: [propertyId], references: [id])
}
```

**API surface:**
| Endpoint | Method | Key inputs | Key outputs | Auth | Key errors |
|---|---|---|---|---|---|
| `/api/properties` | GET | `search`, `minPrice`, `maxPrice`, `page` | list of properties | public | 400 (invalid query) |
| `/api/properties/[id]` | GET | `id` | property detail | public | 404 |
| `/api/admin/properties` | POST | property fields + images | created property | Clerk admin | 400, 401 |
| `/api/admin/properties/[id]` | PATCH | updates | updated property | Clerk admin | 400, 401, 404 |
| `/api/admin/media/[id]` | DELETE | media id | success | Clerk admin | 401, 404 |

**Value sourcing:**
- Property list page displays `title`, `price`, `address`, and `imageUrl` sourced from the `Property` and `Media` tables.
- Search filters source `city` and `price` directly from the DB columns.
- Pagination uses `page` query param to compute `offset` and `limit`.

**Security model:**
- Public endpoints are open (no auth). Admin endpoints require Clerk session with role `admin`.

**Configuration required:**
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` already present in `.env`.

## Proposed stack

| Layer | Choice | Reason |
|---|---|---|
| Language | TypeScript | Consistent with existing codebase |
| Framework | Next.js (App Router) | Already used for the app |
| Primary DB | PostgreSQL (Neon) via Prisma | Existing ORM and DB |
| Auth | Clerk | Already integrated |
| Hosting | Vercel | Current deployment target |
| Observability | Vercel logs + console | Sufficient for now |

## Build plan

1. Add Prisma models `Property` and `Media` (matches **AC-1**, **AC-4**, **AC-5**) – `prisma migrate dev`.
2. Generate Prisma client (`npm run prisma generate`).
3. Implement API routes for public listing (`GET /api/properties`) with search and pagination (satisfies **AC-1**, **AC-2**, **AC-3**).
4. Implement API routes for admin CRUD (`POST /api/admin/properties`, `PATCH /api/admin/properties/[id]`).
5. Add Cloudinary upload helper (`src/lib/cloudinary.ts`) and integrate into admin create/edit endpoints (covers **AC-4**, **AC-5**).
6. Create public page `src/app/properties/page.tsx` using `Suspense` to fetch data, display grid, add search UI and pagination controls.
7. Create admin UI pages for property creation/edit using shadcn/ui components and image uploader.
8. Write Tailwind styling for the grid and cards.
9. Add unit tests for API routes and integration tests for the page (future `/test`).
10. Update README and docs with usage notes.

## Consequences

**Positive:**
- Fast image delivery via Cloudinary CDN.
- Scalable media storage.
- Clean separation of admin and public concerns.

**Negative / tradeoffs:**
- External dependency on Cloudinary service.
- Slightly higher latency for image upload operations.

**Neutral:**
- Requires admin UI implementation, but reuses existing shadcn/ui patterns.

## Follow-up

- [ ] Verify Cloudinary credentials are set in Vercel environment.
- [ ] Add image transformation (auto‑format, responsive) in the UI.

## References

*Project sources*: `AGENTS.md` (auth, Prisma, Cloudinary usage).

