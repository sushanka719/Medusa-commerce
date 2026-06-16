import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { itemId } = req.params;
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const fields = (req.query.fields as string)?.split(",") ?? [
    "id", "title", "slug", "body", "status", "published_at", "metadata", "created_at", "updated_at",
    "content_collection.id", "content_collection.label", "content_collection.slug", "content_collection.format",
    "content_collection.content_fields.id", "content_collection.content_fields.name",
    "content_collection.content_fields.label", "content_collection.content_fields.field_type",
    "content_collection.content_fields.required", "content_collection.content_fields.options",
    "content_collection.content_fields.sort_order",
    "creator.id", "creator.name",
    "tags.id", "tags.value",
  ];

  const { data: [content_item] } = await query.graph(
    { entity: "content_item", fields, filters: { id: itemId } },
    { throwIfKeyNotFound: true }
  );

  res.json({ content_item });
}
