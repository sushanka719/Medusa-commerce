import Medusa from "@medusajs/js-sdk";

export const sdk = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  auth: {
    type: "jwt",
    jwtTokenStorageKey: "aluna_auth_token",
    jwtTokenStorageMethod: typeof window !== "undefined" ? "local" : "memory",
  },
});
