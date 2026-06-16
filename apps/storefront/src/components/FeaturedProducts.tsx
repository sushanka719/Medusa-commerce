import Link from "next/link";
import ProductCard from "./ProductCard";
import { StorefrontProduct } from "@/lib/data/types";

interface FeaturedProductsProps {
  products: StorefrontProduct[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const firstGroup = products.slice(0, 2);
  const secondGroup = products.slice(2, 4);

  return (
    <>
      {/* Section 1: New Collection */}
      <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-4 leading-tight">
            Introducing a brand new collection
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 font-light leading-relaxed">
            Discover our latest arrivals, crafted with the finest ingredients for an unforgettable sensory experience.
          </p>
          <Link
            href="/shop"
            className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors underline underline-offset-4"
          >
            Shop New
          </Link>
        </div>

        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)]">
          {firstGroup.length > 0 ? (
            firstGroup.map((product, index) => (
              <div key={product.id} className="p-6 h-full">
                <ProductCard product={product} index={index} />
              </div>
            ))
          ) : (
            <div className="p-6 col-span-2 text-center text-[var(--text-secondary)]">
              No products available
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Essentials */}
      <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-4 leading-tight">
            Snap up our absolutes
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 font-light leading-relaxed">
            Our essential collection features timeless products that complement any occasion and space.
          </p>
          <Link
            href="/shop"
            className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors underline underline-offset-4"
          >
            Shop Essentials
          </Link>
        </div>

        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)]">
          {secondGroup.length > 0 ? (
            secondGroup.map((product, index) => (
              <div key={product.id} className="p-6 h-full">
                <ProductCard product={product} index={index + 2} />
              </div>
            ))
          ) : (
            <div className="p-6 col-span-2 text-center text-[var(--text-secondary)]">
              No products available
            </div>
          )}
        </div>
      </section>
    </>
  );
}
