# Medusa Commerce — Aluna Storefront

A full-stack e-commerce platform built with **Medusa v2**, **Next.js 16**, and **TypeScript**. Includes a custom branded storefront, CMS-driven blog, product reviews, Stripe payments, and order management.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Medusa v2 (2.15.5) |
| Storefront | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS + Framer Motion |
| State | Zustand (cart + auth with persistence) |
| Payments | Stripe |
| CMS / Blog | medusa-plugin-content |
| Reviews | @lambdacurry/medusa-product-reviews |
| Package Manager | Yarn 4 (Berry) |
| Monorepo | Turborepo |
| Database | PostgreSQL |

## Project Structure

```
my-medusa-store/
├── apps/
│   ├── backend/                  # Medusa backend (API, admin, plugins)
│   │   └── src/
│   │       ├── api/admin/        # Custom admin API routes
│   │       └── medusa-config.ts  # Plugin config
│   └── storefront/               # Next.js storefront
│       └── src/
│           ├── app/              # App Router pages
│           │   ├── page.tsx      # Home
│           │   ├── products/     # Product listing + detail
│           │   ├── cart/         # Cart + checkout
│           │   ├── orders/       # Order history + detail
│           │   ├── journal/      # Blog listing + post
│           │   └── login/        # Auth
│           ├── components/       # Navbar, Hero, etc.
│           ├── lib/data/         # Data fetching (Medusa SDK)
│           └── store/            # Zustand (cart, auth)
├── .yarn/patches/                # Permanent plugin bug fixes
└── turbo.json
```

## Prerequisites

- **Node.js** >= 20
- **PostgreSQL** running locally (or remote)
- **Yarn 4** — enable with `corepack enable`

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/sushanka719/Medusa-commerce.git
cd Medusa-commerce
```

### 2. Install dependencies

```bash
yarn install
```

> Yarn 4 automatically applies all patches in `.yarn/patches/` — no extra steps needed.

---

### 3. Configure environment variables

#### Backend — `apps/backend/.env`

```env
# Database
DATABASE_URL=postgres://YOUR_USER:YOUR_PASSWORD@localhost/medusa_db

# CORS
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:9000
AUTH_CORS=http://localhost:9000,http://localhost:8000

# Secrets — use long random strings in production
JWT_SECRET=supersecretjwt
COOKIE_SECRET=supersecretcookie

# Redis (optional — remove if not using background jobs)
# REDIS_URL=redis://localhost:6379

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Storefront — `apps/storefront/.env.local`

```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...
```

> **How to get the publishable key:** After running the backend, go to  
> Admin (`http://localhost:9000/app`) → Settings → API Keys → Create publishable key.

---

### 4. Set up the database

```bash
# Create the database
createdb medusa_db

# Run Medusa migrations
cd apps/backend
npx medusa db:migrate
```

### 5. Seed data (optional)

```bash
cd apps/backend
npx medusa exec ./src/scripts/seed.ts
```

### 6. Create an admin user

```bash
cd apps/backend
npx medusa user -e admin@example.com -p yourpassword
```

### 7. Start the development servers

From the project root:

```bash
yarn dev
```

Turborepo starts both apps concurrently:

| Service | URL |
|---------|-----|
| Storefront | http://localhost:8000 |
| Admin Dashboard | http://localhost:9000/app |

---

## Features

### Storefront
- Product listing with category filtering
- Product detail with image gallery, variants, and star ratings
- Cart with slide-out drawer
- Stripe Checkout integration
- Customer authentication (register, login, logout)
- Persistent JWT auth across page reloads (Zustand + localStorage)
- **My Orders** — order history with status badges
- **Order Detail** — line items, totals, shipping/billing addresses
- **Journal / Blog** — CMS-driven posts with hero featured article
- Search overlay
- Responsive design

### Admin
- Full Medusa v2 admin dashboard at `/app`
- Content collections (blog posts via CMS plugin)
- Product reviews moderation
- Custom proxy route `/admin/content-items/:id` (fixes plugin navigation bug)

---

## CMS Blog Setup

1. Go to **Admin → Content → New Collection**
   - Label: `Blog`
   - Slug: `blog`

2. Inside the collection, create items. Fill in:
   - **Title** — post title
   - **Slug** — URL-safe identifier (e.g. `my-first-post`)
   - **Body** — HTML content for the post body
   - **Status** — set to `Published`

3. In the **Metadata** section, add these key-value pairs:

| Key | Example Value | Purpose |
|-----|--------------|---------|
| `excerpt` | A short summary of the post | Shown in grid cards |
| `cover_image` | `https://images.unsplash.com/...` | Card and post hero image |
| `author` | `Jane Smith` | Byline |
| `read_time` | `5 min` | Reading time badge |
| `category` | `Rituals` | Category tag |
| `featured` | `true` | Makes this the hero post |

> **Note:** Only one post should have `featured: true` at a time.

---

## Product Reviews

Customers who have purchased a product can leave a review from the product detail page.

- Reviews require admin approval before appearing publicly
- Star ratings displayed as aggregate on product cards and detail pages
- Admin can approve/reject reviews in the dashboard

---

## Yarn Patches

Plugin bugs are permanently fixed via Yarn 4's built-in patch system. Patches live in `.yarn/patches/` and are applied automatically on `yarn install`:

| Patch | Issue Fixed |
|-------|------------|
| `@lambdacurry/medusa-product-reviews@1.4.0` | Zod v3 → v4 compatibility (6 middleware files use `@medusajs/deps/zod`) |
| `medusa-plugin-content@0.2.0` | Missing `content_collection_id` field in validator; admin item navigation |

---

## Production Deployment

### 1. Build

```bash
yarn build
```

### 2. Environment variables

Set all variables from step 3 above on your server. Use strong, randomly generated secrets.

### 3. Run migrations

```bash
cd apps/backend && npx medusa db:migrate
```

### 4. Start

```bash
yarn start
```

---

## Troubleshooting

**Backend fails to start with `Cannot read properties of undefined (reading 'def')`**  
→ Zod version mismatch. Run `yarn install` to ensure patches are applied.

**Storefront auth state lost on reload**  
→ Ensure `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` is set in `.env.local`.

**Storefront can't reach backend (`ECONNREFUSED`)**  
→ Start the backend first; it may take ~10s to fully initialize before the storefront can connect.

**Admin error creating content items (`Unrecognized fields: content_collection_id`)**  
→ Run `yarn install` to apply the `medusa-plugin-content` patch.

---

## License

MIT
