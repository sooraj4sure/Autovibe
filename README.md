# 🚗 LuxeAuto — Premium Car Accessories E-Commerce Platform

A full-stack, production-ready luxury e-commerce application built with **Next.js 14 (App Router)**, **MongoDB**, **Cloudinary**, and **JWT authentication**.

---

## ✨ Features

### 🛍️ Customer Storefront
- **Hero Section** — Cinematic dark theme with Playfair Display typography
- **Featured Products** — Server-side rendered, ISR-cached featured items
- **Category Grid** — 8 curated categories with animated hover cards
- **Product Listing** — Infinite-feeling grid with filters (category, price range, sort, search with 400ms debounce)
- **Product Detail** — Image gallery with click-to-zoom, quantity control, wishlist, add to cart
- **Cart Drawer** — Animated slide-in with live totals (GST + shipping)
- **Full Cart Page** — Quantity management, order summary
- **Checkout** — Multi-field shipping form, COD / Razorpay payment selection
- **Order Success** — Animated confirmation with full order summary
- **Wishlist** — Persisted to localStorage via Redux

### 🔐 Admin Panel
- **Secure Login** — JWT auth via HTTP-only cookies
- **Dashboard** — Revenue, order/product counts, status breakdowns, recent orders table
- **Product Management** — Full CRUD with Cloudinary image upload, specifications, tags
- **Order Management** — Filter by status/payment, inline status update dropdown

### ⚙️ Technical Highlights
- App Router with nested layouts (store + admin)
- Redux Toolkit for cart + wishlist state with localStorage hydration
- Mongoose models with indexes for performance
- Framer Motion animations throughout
- Skeleton loaders on all async content
- Mobile-first responsive design
- SEO metadata on all pages

---

## 🗂️ Project Structure

```
luxe-auto/
├── src/
│   ├── app/
│   │   ├── api/                     # Next.js API Routes
│   │   │   ├── auth/login/          # POST - Admin login
│   │   │   ├── auth/logout/         # POST - Admin logout
│   │   │   ├── auth/verify/         # GET  - Verify token
│   │   │   ├── products/            # GET (public), POST (admin)
│   │   │   ├── products/[id]/       # GET, PUT, DELETE
│   │   │   ├── orders/              # GET (admin), POST (public)
│   │   │   ├── orders/[id]/         # GET, PUT
│   │   │   ├── orders/stats/        # GET dashboard stats
│   │   │   └── upload/              # POST/DELETE Cloudinary
│   │   ├── store/                   # Customer-facing pages
│   │   │   ├── layout.tsx           # Navbar + Footer + CartDrawer
│   │   │   ├── page.tsx             # Home page
│   │   │   ├── products/            # Products listing
│   │   │   ├── products/[slug]/     # Product detail
│   │   │   ├── cart/                # Cart page
│   │   │   ├── checkout/            # Checkout page
│   │   │   ├── order-success/       # Post-order confirmation
│   │   │   └── wishlist/            # Saved items
│   │   ├── admin/                   # Admin panel (protected)
│   │   │   ├── layout.tsx           # Sidebar + auth guard
│   │   │   ├── login/               # Admin login page
│   │   │   ├── dashboard/           # Stats dashboard
│   │   │   ├── products/            # Product list
│   │   │   ├── products/new/        # Create product
│   │   │   ├── products/[id]/edit/  # Edit product
│   │   │   └── orders/              # Order management
│   │   ├── layout.tsx               # Root layout (fonts + providers)
│   │   ├── page.tsx                 # Redirects to /store
│   │   └── globals.css              # Tailwind + custom CSS
│   ├── components/
│   │   ├── ui/Button.tsx            # Reusable luxury button
│   │   ├── layout/Navbar.tsx        # Sticky nav with cart/wishlist
│   │   ├── layout/Footer.tsx        # Footer with links
│   │   ├── cart/CartDrawer.tsx      # Animated cart sidebar
│   │   ├── home/HeroSection.tsx     # Full-screen hero
│   │   ├── home/FeaturedProducts.tsx
│   │   ├── home/CategoriesSection.tsx
│   │   ├── home/BrandStatement.tsx
│   │   ├── home/TestimonialsSection.tsx
│   │   ├── products/ProductCard.tsx
│   │   ├── products/ProductCardSkeleton.tsx
│   │   ├── products/ProductsClient.tsx
│   │   ├── products/ProductDetailClient.tsx
│   │   └── admin/ProductForm.tsx
│   ├── context/
│   │   ├── StoreProvider.tsx        # Redux Provider + localStorage sync
│   │   └── AdminAuthContext.tsx     # Admin auth state
│   ├── hooks/
│   │   └── useStore.ts              # Typed Redux hooks
│   ├── lib/
│   │   ├── mongodb.ts               # Connection pooling
│   │   ├── cloudinary.ts            # Upload/delete/optimize
│   │   ├── auth.ts                  # JWT sign/verify/cookies
│   │   ├── utils.ts                 # formatPrice, cn, generateSlug, etc.
│   │   └── store/
│   │       ├── index.ts             # Redux store config
│   │       ├── cartSlice.ts         # Cart state + reducers
│   │       └── wishlistSlice.ts     # Wishlist state
│   ├── models/
│   │   ├── Product.ts               # Mongoose Product schema
│   │   └── Order.ts                 # Mongoose Order schema
│   └── types/
│       └── index.ts                 # All TypeScript interfaces
├── public/                          # Static assets
├── .env.local.example               # Environment variable template
├── tailwind.config.ts               # Custom theme (gold, obsidian, etc.)
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <your-repo>
cd luxe-auto
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Then fill in all values in `.env.local`:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Min 32-char random string |
| `NEXTAUTH_SECRET` | Random secret for NextAuth |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD_HASH` | bcrypt hash of admin password |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` in dev |

### 3. Generate Admin Password Hash

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your_password', 12).then(console.log)"
```

Copy the output into `ADMIN_PASSWORD_HASH` in `.env.local`.

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- **Store:** http://localhost:3000/store
- **Admin:** http://localhost:3000/admin/login

---

## ☁️ Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Go to **Settings → Upload** and create an **unsigned upload preset** named `luxe-auto`
3. Copy your Cloud Name, API Key, and API Secret into `.env.local`

---

## 🗄️ MongoDB Setup

1. Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a database user with read/write access
3. Whitelist your IP (or use `0.0.0.0/0` for development)
4. Copy the connection string into `MONGODB_URI`

---

## 💳 Razorpay Integration (Optional)

To enable live Razorpay payments:

1. Create an account at [razorpay.com](https://razorpay.com)
2. Get your Key ID and Secret from the dashboard
3. Add them to `.env.local`
4. In `src/app/store/checkout/page.tsx`, add Razorpay order creation when `paymentMethod === "Prepaid"`

---

## 🚢 Deployment (Vercel)

```bash
npm i -g vercel
vercel
```

Set all environment variables in your Vercel project dashboard under **Settings → Environment Variables**.

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `obsidian` | `#0D0D0D` | Page background |
| `gold` | `#C9A14A` | Primary accent, CTAs |
| `graphite` | `#1E1E1E` | Card backgrounds |
| `ivory` | `#F5F0E8` | Primary text |
| `ash` | `#888888` | Secondary/muted text |

**Fonts:**
- `Playfair Display` — Display headings (`font-display`)
- `Cormorant Garamond` — Body text (`font-body`)
- `Poppins` — UI labels, buttons (`font-sans`)

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `next@14` | Framework (App Router) |
| `mongoose` | MongoDB ODM |
| `framer-motion` | Animations |
| `@reduxjs/toolkit` | State management |
| `cloudinary` | Image storage |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | Admin JWT auth |
| `react-hot-toast` | Notifications |
| `use-debounce` | Search debouncing |
| `lucide-react` | Icons |

---

## 🔧 Extending the Project

### Add Razorpay Payment
Install `razorpay` package and create `/api/orders/create-payment` route that creates a Razorpay order, then add the Razorpay checkout script in the checkout page.

### Add Email Notifications
Use `nodemailer` or `resend` to send order confirmation emails when an order is created.

### Add Product Reviews
Create a `Review` mongoose model linked to products and add a reviews section on the product detail page.

### Add SEO Sitemap
Use `next-sitemap` package to auto-generate `sitemap.xml` and `robots.txt`.

---

## 📄 License

MIT — Free to use, modify, and distribute.
