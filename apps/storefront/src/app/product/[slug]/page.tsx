import { notFound } from "next/navigation";
import { getProductByHandle, getProducts } from "@/lib/data/products";
import ProductClient from "@/components/product/ProductClient";
import ProductReviews from "@/components/product/ProductReviews";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, { products: allProducts }] = await Promise.all([
    getProductByHandle(slug),
    getProducts({ limit: 8 }),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <ProductClient product={product} relatedProducts={relatedProducts} />
      <ProductReviews productId={product.id} />
    </>
  );
}
