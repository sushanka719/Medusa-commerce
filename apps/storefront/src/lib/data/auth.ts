import { sdk } from "@/lib/medusa";

export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export async function loginCustomer(email: string, password: string): Promise<void> {
  await sdk.auth.login("customer", "emailpass", { email, password });
}

export async function registerCustomer(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<void> {
  await sdk.auth.register("customer", "emailpass", { email, password });
  await sdk.store.customer.create({ first_name: firstName, last_name: lastName, email });
  await sdk.auth.login("customer", "emailpass", { email, password });
}

export async function logoutCustomer(): Promise<void> {
  await sdk.auth.logout();
}

export async function getCustomer(): Promise<Customer | null> {
  try {
    const { customer } = await sdk.store.customer.retrieve();
    return customer as Customer;
  } catch {
    return null;
  }
}
