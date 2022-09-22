/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { h } from "preact";
import { tw } from "@twind";
import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/models";
import { NotionPageProperties, NotionResponse } from "../types/Database.d.ts";
import InlinePost from "@islands/InlinePost.tsx";

type Response = NotionResponse<NotionPageProperties>;

export const handler: Handlers<QueryDatabaseResponse | null> = {
  async GET(req, ctx) {
    const client = new Client({ auth: Deno.env.get("NOTION_TOKEN") || "" });
    const data = await client.databases.query({
      database_id: Deno.env.get("NOTION_DATABASE_ID") || "",
      filter: {
        property: "Status",
        select: { equals: "Completed" },
      },
    });
    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps<Response | null>) {
  if (!data) {
    return <h1>No post</h1>;
  }
  const renderInlinePosts = () => {
    return data.results.map((page) => (
      <InlinePost
        title={page.properties.Name.title[0].plain_text}
        createdTime={page.created_time}
      ></InlinePost>
    ));
  };
  return (
    <main class={tw`min-h-screen bg-gray-50`}>
      <h1 class={tw`text-2xl text-center font-bold`}>Dev Blogs</h1>
      <h2 class={tw`text-center`}>by Krit Bannachaisirisuk</h2>
      <div class={tw`p-4 mx-auto max-w-screen-md space-y-4`}>
        {renderInlinePosts()}
      </div>
    </main>
  );
}
