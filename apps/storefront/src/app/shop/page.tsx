import { getProducts, getProductCategories } from "@/lib/data/products";
import ShopClient from "@/components/shop/ShopClient";

export default async function ShopPage() {
  const [{ products }, categories] = await Promise.all([
    getProducts({ limit: 100 }),
    getProductCategories(),
  ]);

  return <ShopClient initialProducts={products} categories={categories} />;
}
