import { HandlerContext } from "$fresh/server.ts";
import { NotionDbConnector } from "@kritb-blog/notion-db-connector";

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const connector = new NotionDbConnector(Deno.env.get("NOTION_TOKEN") || "");
  const result = await connector.fetchDb({
    database_id: Deno.env.get("NOTION_DATABASE_ID") || "",
    filter: {
      and: [
        {
          timestamp: "created_time",
          created_time: {
            on_or_before: "2021-09-31T00:00:00",
            after: "2021-09-01T00:00:00",
          },
        },
        {
          property: "Status",
          select: { equals: "Completed" },
        },
      ],
    },
  });

  return new Response(result);
};
