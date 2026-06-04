import { getPublicConfig } from "@/lib/clients";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const widgetId = searchParams.get("widgetId");

  const config = getPublicConfig(widgetId);
  if (!config) {
    return Response.json({ error: "Widget not found." }, { status: 404 });
  }

  return Response.json(config);
}
