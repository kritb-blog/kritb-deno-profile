import { HandlerContext } from "$fresh/server.ts";
import { Client } from "@notionhq/client";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  const client = new Client({ auth: Deno.env.get("NOTION_TOKEN") || "" });
  const result = await client.databases.query({
    database_id: Deno.env.get("NOTION_DATABASE_ID") || "",
    filter: {
      property: "Status",
      select: { equals: "Completed" },
    },
  });
  console.log(result)
  return new Response(JSON.stringify(result.results));
};
