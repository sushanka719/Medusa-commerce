import { sdk } from "@/lib/medusa";

export interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  thumbnail?: string;
  variant?: { title?: string };
}

export interface OrderAddress {
  first_name?: string;
  last_name?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  country_code?: string;
}

export interface Order {
  id: string;
  display_id: number;
  status: string;
  created_at: string;
  total: number;
  subtotal: number;
  shipping_total: number;
  tax_total: number;
  discount_total: number;
  currency_code: string;
  items: OrderItem[];
  shipping_address?: OrderAddress;
  billing_address?: OrderAddress;
  email?: string;
  payment_status?: string;
  fulfillment_status?: string;
}

const ORDER_FIELDS =
  "+items,+items.thumbnail,+items.variant,+shipping_address,+billing_address,+payment_status,+fulfillment_status,+subtotal,+shipping_total,+tax_total,+discount_total";

export async function getOrders(): Promise<Order[]> {
  try {
    const response = await sdk.store.order.list({ fields: ORDER_FIELDS } as any);
    return ((response as any).orders ?? []) as Order[];
  } catch {
    return [];
  }
}

export async function getOrder(id: string): Promise<Order | null> {
  try {
    const response = await sdk.store.order.retrieve(id, { fields: ORDER_FIELDS } as any);
    return ((response as any).order ?? null) as Order | null;
  } catch {
    return null;
  }
}
