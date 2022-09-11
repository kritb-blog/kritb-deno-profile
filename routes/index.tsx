/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { h } from "preact";
import { tw } from "@twind";
import { NotionDatabase, NotionPageProperties } from "../types/Database.d.ts";
import InlinePost from "@islands/InlinePost.tsx";

type Data = NotionDatabase<NotionPageProperties>[];

export const handler: Handlers<Data | null> = {
  async GET(req, ctx) {
    const { host, protocol } = new URL(req.url);
    const postsUrl = new URL("/api/posts", `${protocol}${host}`);
    const resp = await fetch(postsUrl.href);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const data: any = await resp.json();
    console.log(data)
    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps<Data | null>) {
  if (!data) {
    return <h1>No post</h1>;
  }
  const renderInlinePosts = () => {
    return data.map((page) => (
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
