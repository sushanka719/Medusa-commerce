export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  details: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  rating?: number;
  reviews?: number;
  inStock: boolean;
  featured: boolean;
  new: boolean;
}

// Updated with darker/luxury themed Pexels images
export const products: Product[] = [
  {
    id: "1",
    name: "Midnight Velvet Candle",
    slug: "midnight-velvet-candle",
    price: 68.0,
    originalPrice: 82.0,
    category: "Candles",
    image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1612293905607-b003de9e54fb?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1623018198073-b847ee931a35?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1594360439490-cb29ee2b3e06?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description:
      "A captivating signature scent of dark rose, oud, and midnight jasmine, designed to pair beautifully with our evening candle rituals.",
    details: ["300g candle", "Natural wax blend", "60+ hours burn time", "Cotton wick"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
    new: true
  },
  {
    id: "2",
    name: "Aurora Crystal Diffuser",
    slug: "aurora-crystal-diffuser",
    price: 95.00,
    category: "Candles",
    image: "https://images.unsplash.com/photo-1602952706017-f3cc19eb98af?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1637508858752-f047b38a0dd8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1617041265682-a241905534f0?q=80&w=985&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description:
      "Hand-crafted crystal diffuser infused with essential oils to softly scent your space between candle burns.",
    details: ["200ml capacity", "Includes 10 rattan reeds", "Lasts up to 3 months", "Refillable design"],
    inStock: true,
    featured: true,
    new: false
  },
  {
    id: "3",
    name: "Noir Elegance Candle Set",
    slug: "noir-elegance-candle-set",
    price: 145.00,
    category: "Candles",
    image: "https://images.unsplash.com/photo-1595679733716-e5d1bc847446?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1745125996226-879b0cb74e8f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1608263153703-caa6b0fd7bc7?q=80&w=1001&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description:
      "A trio of hand-poured soy candles with sandalwood, amber, and vanilla, created for layered candlelight across your home.",
    details: ["Set of 3 candles", "60+ hours burn time each", "100% natural soy wax", "Cotton wicks"],
    inStock: true,
    featured: true,
    new: false
  },
  {
    id: "4",
    name: "Celestial Body Oil",
    slug: "celestial-body-oil",
    price: 78.00,
    category: "Candles",
    image: "https://images.unsplash.com/photo-1709375493391-4d10a4a681f4?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1709375493377-a59cbfbe94e6?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1733945316613-e603334423dc?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description:
      "Luxurious body oil with 24k gold flakes and nourishing botanicals, perfect for pre‑candle evening rituals and slow self-care.",
    details: ["100ml bottle", "24k gold-infused", "Organic ingredients", "Non-greasy formula"],
    inStock: true,
    featured: false,
    new: true
  },
  {
    id: "5",
    name: "Obsidian Stone Holder",
    slug: "obsidian-stone-holder",
    price: 65.00,
    category: "Candles",
    image: "https://images.unsplash.com/photo-1728703921380-71302eb5dc28?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1728703921380-71302eb5dc28?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description:
      "Handcrafted obsidian incense holder that adds sculptural depth to your candle trays and meditation corners.",
    details: ["Natural obsidian stone", "Fits standard incense", "Each piece unique", "Comes with gift box"],
    inStock: true,
    featured: false,
    new: false
  },
  {
    id: "6",
    name: "Ethereal Mist Room Spray",
    slug: "ethereal-mist-spray",
    price: 42.00,
    category: "Home",
    image: "https://images.unsplash.com/photo-1604172083627-9e45cddb7f7a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1604172083627-9e45cddb7f7a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description:
      "A refreshing blend of eucalyptus, mint, and white tea to lightly mist the room before or after lighting your favourite candle.",
    details: ["250ml bottle", "Alcohol-free formula", "Safe for fabrics", "Long-lasting scent"],
    inStock: true,
    featured: false,
    new: true
  },
  {
    id: "7",
    name: "Velvet Rose Hand Cream",
    slug: "velvet-rose-hand-cream",
    price: 38.00,
    category: "Body",
    image: "https://images.unsplash.com/photo-1637508857728-cd6aa260253a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1637508857728-cd6aa260253a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description:
      "Ultra-moisturizing hand cream with Bulgarian rose and shea butter, formulated for hands that tend wicks, matches, and candle vessels.",
    details: ["75ml tube", "Fast-absorbing", "Paraben-free", "Rose essential oil"],
    inStock: true,
    featured: false,
    new: false
  },
  {
    id: "8",
    name: "Sanctuary Scented Candle",
    slug: "sanctuary-candle",
    price: 55.00,
    category: "Candles",
    image: "https://images.unsplash.com/photo-1662820368409-19b31e11d639?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1662820368409-19b31e11d639?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description:
      "A sanctuary-in-a-glass candle with warm notes of cedarwood, bergamot, and musk, crafted to anchor your daily unwind ritual.",
    details: ["300g candle", "50+ hours burn time", "Wooden wick", "Reusable vessel"],
    inStock: true,
    featured: true,
    new: false
  }
];

export const categories = [
  { name: "All", slug: "all" },
  { name: "Candles", slug: "candles" },
  { name: "Jar Candles", slug: "jar-candles" },
  { name: "Pillar Candles", slug: "pillar-candles" },
  { name: "Candle Sets", slug: "candle-sets" }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(p => p.new);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all") return products;
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
};
