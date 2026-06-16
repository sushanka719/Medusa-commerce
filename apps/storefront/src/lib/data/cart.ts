import { sdk } from "@/lib/medusa";

export async function getDefaultRegionId(): Promise<string> {
  const { regions } = await sdk.store.region.list();
  if (!regions?.length) throw new Error("No regions configured in Medusa");
  return regions[0].id;
}

export async function createCart() {
  const region_id = await getDefaultRegionId();
  const response = await sdk.store.cart.create({ region_id });
  return response.cart;
}

export async function addToCart(cartId: string, variantId: string, quantity: number) {
  const response = await sdk.store.cart.createLineItem(cartId, {
    variant_id: variantId,
    quantity,
  });
  return response.cart;
}

export async function getCart(cartId: string) {
  const response = await sdk.store.cart.retrieve(cartId, { fields: "+region,+region.countries" });
  return response.cart;
}

export async function getCartRegionCountries(cartId: string): Promise<{ code: string; name: string }[]> {
  const cart = await getCart(cartId);
  const countries: any[] = (cart as any).region?.countries ?? [];
  return countries.map((c: any) => ({ code: c.iso_2, name: c.display_name ?? c.name }));
}

export async function updateCartContact(
  cartId: string,
  email: string,
  shippingAddress: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postal_code: string;
    country_code: string;
    phone?: string;
  }
) {
  const response = await sdk.store.cart.update(cartId, {
    email,
    shipping_address: shippingAddress,
  });
  return response.cart;
}

export async function listShippingOptions(cartId: string) {
  const response = await sdk.store.fulfillment.listCartOptions({ cart_id: cartId });
  return response.shipping_options ?? [];
}

export async function addShippingMethod(cartId: string, optionId: string) {
  const response = await sdk.store.cart.addShippingMethod(cartId, {
    option_id: optionId,
  });
  return response.cart;
}

export async function initiatePayment(cartId: string, providerId: string) {
  const cart = await getCart(cartId);
  const response = await sdk.store.payment.initiatePaymentSession(cart, {
    provider_id: providerId,
  });
  return response;
}

export async function completeCart(cartId: string) {
  const response = await sdk.store.cart.complete(cartId);
  return response;
}
