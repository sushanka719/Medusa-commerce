import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoriesGrid from "@/components/CategoriesGrid";
import FullWidthBanner from "@/components/FullWidthBanner";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import JournalSection from "@/components/JournalSection";
import Newsletter from "@/components/Newsletter";
import { getProducts, getProductCategories } from "@/lib/data/products";
import { getBlogPosts } from "@/lib/data/blog";

export default async function Home() {
  const [{ products }, categories, blogPosts] = await Promise.all([
    getProducts({ limit: 4 }),
    getProductCategories(),
    getBlogPosts(),
  ]);

  const featuredProduct = products[0]
    ? { name: products[0].name, price: products[0].price, slug: products[0].slug }
    : null;

  const shopCategories = categories.filter((c) => c.slug !== "all");

  return (
    <div className="flex flex-col">
      <Hero featuredProduct={featuredProduct} />
      <MarqueeBanner />
      <FeaturedProducts products={products} />
      <CategoriesGrid categories={shopCategories} />
      <FullWidthBanner />
      <AboutSection />
      <TestimonialsSection />
      <JournalSection posts={blogPosts.slice(0, 3)} />
      <Newsletter />
    </div>
  );
}
