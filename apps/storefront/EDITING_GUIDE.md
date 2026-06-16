### Aluna Template – Editing Guide

This guide explains how to edit the Aluna template (Next.js + Tailwind): where things live, how to change text, images, colors, and basic settings—without touching the license terms.

---

## 1. Project Structure

Here are the key directories you'll work with:

- **`src/app/`**: Contains all the pages of your website.
  - `page.tsx`: The Homepage.
  - `shop/page.tsx`: The Shop page.
  - `about/page.tsx`: The About page.
  - `journal/page.tsx`: The Journal page.
  - `contact/page.tsx`: The Contact page.
  - `product/[slug]/page.tsx`: Individual Product page template.
- **`src/components/`**: Reusable UI components (Navbar, Footer, ProductCard, etc.).
- **`src/data/`**: Static data files (Products, Categories, etc.).
- **`public/`**: Static assets like logos or favicons.

---

## 2. Changing Images

The site uses the Next.js `<Image />` component for optimized loading. Most images are currently loaded from external URLs (Pexels/Unsplash style sources).

### To Change Hero Images (Page Headers):

- **Home Page**: Open `src/components/Hero.tsx`
  - Look for the `<Image src="..." />` tag. Replace the URL with your new image URL.
- **Shop Page**: Open `src/app/shop/page.tsx`
  - Look for the "Hero Image" section (approx line 70).
- **About, Journal, Contact Pages**:
  - Open the respective `page.tsx` file in `src/app/`.
  - Look for the `<div className="hidden lg:block w-full lg:w-2/3 ...">` section containing the `<Image />`.

**Tip:** For best results, use high‑resolution images (at least 1920px wide for full‑width hero sections, and around 1200px for half‑width or grid layouts).

---

## 3. Editing Text Content

### Home Page
- **Hero Section**: Edit `src/components/Hero.tsx`.
- **Mission/About**: Edit `src/components/AboutSection.tsx`.
- **Banner**: Edit `src/components/FullWidthBanner.tsx`.
- **Testimonials**: Edit `src/components/TestimonialsSection.tsx`.

### Other Pages
- **About Page**: Edit `src/app/about/page.tsx`.
  - Contains "Our Story", "Journey", "Values", and "Team" sections.
- **Journal Page**: Edit `src/app/journal/page.tsx` and `src/app/journal/[slug]/page.tsx` for individual article details.
- **Contact Page**: Edit `src/app/contact/page.tsx`.

---

## 4. Managing Products

Product data is stored in a static TypeScript file, so you can add or edit products without setting up a database.

**File Location:** `src/data/products.ts`

### To Add a New Product

1. Open `src/data/products.ts`.
2. Add a new object to the `products` array:

```typescript
{
  id: "new-product-id",
  slug: "new-product-slug", // URL-friendly name (e.g., "midnight-velvet")
  name: "New Product Name",
  description: "Short description for cards.",
  price: 150.00,
  category: "Fragrance", // Must match existing categories or add new ones
  image: "https://your-image-url.com/image.jpg", // Main image
  images: [ // Gallery images
    "https://your-image-url.com/img1.jpg",
    "https://your-image-url.com/img2.jpg"
  ],
  featured: true, // Set to true to show on Home page
  scent_notes: "Top note, Heart note, Base note", // Optional
  details: "Longer description for product page." // Optional
}
```

---

## 5. Managing Journal Articles

Journal article metadata and content are defined in the data file.

**File Location:** `src/data/articles.ts`

### To Add an Article

1. Open `src/data/articles.ts`.
2. Add a new object to the `articles` array.
3. Each article includes `slug`, `title`, `excerpt`, `content` (HTML string), `image`, `date`, `category`, `readTime`, `featured`, and `author` information.

```typescript
{
  slug: "new-article-title",
  title: "New Article Title",
  excerpt: "Short summary shown on the grid.",
  content: "<p>Full article content in HTML.</p>",
  image: "https://image-url.com/...",
  date: "December 10, 2025",
  category: "Lifestyle",
  readTime: "5 min",
  featured: false, // Set to true to make it the big hero article
  author: "Your Name"
}
```

---

## 6. Styling & Design System

The site uses **Tailwind CSS** plus **CSS variables** for a consistent theme.

**Global Styles:** `src/app/globals.css`

### Changing Colors

To change theme colors globally, edit the `:root` variables in `src/app/globals.css`:

- `--background`: Main background color (currently `#F9F9F7` - Off-white).
- `--foreground`: Main text color (currently `#1A1A1A` - Dark/Black).
- `--card-border`: Color for grid lines and borders (currently `#E5E5E5`).

### Typography

- **Serif font (headings)**: `font-serif` (e.g. Playfair Display via `layout.tsx`).
- **Sans-serif font (body)**: `font-sans` (configured in `layout.tsx` + `globals.css`).
- **Italic accents**: Use `<span className="italic">Word</span>` inside headings or key phrases to keep the editorial feel.

### Grid Layout

Many sections use a **1/3 + 2/3** editorial split:

- **Left column (text)**: `w-full lg:w-1/3`
- **Right column (image)**: `w-full lg:w-2/3`

You can reuse this pattern for new sections to keep everything visually consistent.

---

## 7. Icons

The project uses **Lucide React** for icons.

To use a new icon:

1. Import it: `import { IconName } from "lucide-react";`
2. Render it: `<IconName size={20} strokeWidth={1.5} />`

> Tip: `strokeWidth={1.5}` gives a slightly finer, more elegant line weight.

---

## 8. Development

To run the project locally after making changes:

```bash
npm run dev
# or
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to preview your changes.
