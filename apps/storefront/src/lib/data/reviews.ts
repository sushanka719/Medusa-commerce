import { sdk } from "@/lib/medusa";

export interface ProductReview {
  id: string;
  name: string | null;
  rating: number;
  content: string | null;
  status: "pending" | "approved" | "flagged";
  product_id: string | null;
  created_at: string;
  response?: { id: string; content: string } | null;
  images?: { id: string; url: string }[];
}

export interface ProductReviewStats {
  product_id: string;
  average: number;
  count: number;
  distribution: Record<string, number>; // { "1": 2, "2": 0, ... "5": 10 }
}

export interface OrderLineItemForReview {
  order_id: string;
  line_item_id: string;
  product_id: string;
  product_name: string;
  existing_review?: ProductReview;
}

export async function getProductReviews(productId: string): Promise<{
  reviews: ProductReview[];
  count: number;
}> {
  const response = await sdk.client.fetch<{ product_reviews: ProductReview[]; count: number }>(
    `/store/product-reviews?product_id=${productId}&limit=50`
  );
  return { reviews: response.product_reviews ?? [], count: response.count ?? 0 };
}

export async function getProductReviewStats(productId: string): Promise<ProductReviewStats | null> {
  try {
    const response = await sdk.client.fetch<{ product_review_stats: any[] }>(
      `/store/product-review-stats?product_id=${productId}`
    );
    const stats = response.product_review_stats?.[0];
    if (!stats) return null;
    return {
      product_id: stats.product_id,
      average: stats.average ?? 0,
      count: stats.count ?? 0,
      distribution: stats.distribution ?? {},
    };
  } catch {
    return null;
  }
}

export async function getOrderLineItemsForProduct(productId: string): Promise<OrderLineItemForReview[]> {
  try {
    const response = await sdk.store.order.list({ fields: "+items,+items.product_id" } as any);
    const orders: any[] = (response as any).orders ?? [];
    const results: OrderLineItemForReview[] = [];
    for (const order of orders) {
      for (const item of order.items ?? []) {
        if (item.product_id === productId) {
          results.push({
            order_id: order.id,
            line_item_id: item.id,
            product_id: item.product_id,
            product_name: item.title ?? "",
          });
        }
      }
    }
    return results;
  } catch {
    return [];
  }
}

export async function submitReview(data: {
  order_id: string;
  order_line_item_id: string;
  rating: number;
  content: string;
}): Promise<ProductReview[]> {
  const response = await sdk.client.fetch<{ product_reviews: ProductReview[] }>(
    "/store/product-reviews",
    {
      method: "POST",
      body: {
        reviews: [
          {
            order_id: data.order_id,
            order_line_item_id: data.order_line_item_id,
            rating: data.rating,
            content: data.content,
            images: [],
          },
        ],
      },
    }
  );
  return response.product_reviews ?? [];
}
