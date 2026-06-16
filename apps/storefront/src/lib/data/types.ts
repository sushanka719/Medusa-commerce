export interface ProductVariant {
  id: string;
  title: string;
  sku?: string;
  price: number;
  inStock: boolean;
  options: Record<string, string>; // { "Size": "M", "Color": "Black" }
}

export interface ProductOption {
  id: string;
  title: string;
  values: string[];
}

export interface StorefrontProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  details: string[];
  category: string;
  categorySlug?: string;
  categoryId?: string;
  // legacy single-variant fields (used for listing pages)
  variantId?: string;
  inStock: boolean;
  // full variant data (used for product detail page)
  variants: ProductVariant[];
  options: ProductOption[];
  featured: boolean;
  isNew: boolean;
  weight?: number;
  material?: string;
}

export interface StorefrontCategory {
  name: string;
  slug: string;
  id?: string;
  image?: string;
  description?: string;
}
