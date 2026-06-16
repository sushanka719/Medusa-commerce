import { sdk } from "@/lib/medusa";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  body: string | null;
  published_at: string | null;
  // stored in metadata
  excerpt?: string;
  cover_image?: string;
  author?: string;
  read_time?: string;
  category?: string;
  featured?: boolean;
}

function parseBodyAsMetadata(body: string | null): Record<string, any> {
  if (!body) return {};
  try {
    const parsed = JSON.parse(body);
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) return parsed;
  } catch {}
  return {};
}

function mapItem(item: any): BlogPost {
  // Support metadata stored in the metadata field OR accidentally put in body as JSON
  const meta = item.metadata ?? parseBodyAsMetadata(item.body);
  const isBodyJson = item.body && (() => { try { JSON.parse(item.body); return true; } catch { return false; } })();

  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    body: isBodyJson ? null : (item.body ?? null),
    published_at: item.published_at ?? null,
    excerpt: meta.excerpt,
    cover_image: meta.cover_image,
    author: meta.author,
    read_time: meta.read_time,
    category: meta.category,
    featured: meta.featured === true || meta.featured === "true",
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await sdk.client.fetch<{ content_items: any[]; count: number }>(
      "/content/blog/items?limit=50"
    );
    return (response.content_items ?? []).map(mapItem);
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await sdk.client.fetch<{ content_item: any }>(
      `/content/blog/items/${slug}`
    );
    return response.content_item ? mapItem(response.content_item) : null;
  } catch {
    return null;
  }
}
