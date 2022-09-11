/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { h } from "preact";
import { tw } from "@twind";
import { NotionDatabase, NotionPageProperties } from "../types/Database.ts";

type Data = NotionDatabase<NotionPageProperties>[];

export const handler: Handlers<Data | null> = {
  async GET(_, ctx) {
    const resp = await fetch(Deno.env.get("POST_API_URL") || "");
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const data: Data = await resp.json();
    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps<Data | null>) {
  if (!data) {
    return <h1>No post</h1>;
  }
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      {data.map((page) => (
        <div>{page.properties.Name.title[0].plain_text}</div>
      ))}
    </div>
  );
}
