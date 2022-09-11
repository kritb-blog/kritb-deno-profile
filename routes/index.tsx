/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { h } from "preact";
import { tw } from "@twind";
import { NotionPageProperties, NotionResponse } from "../types/Database.d.ts";
import InlinePost from "@islands/InlinePost.tsx";

type Response = NotionResponse<NotionPageProperties>;

export const handler: Handlers<Response | null> = {
  async GET(req, ctx) {
    const { host, protocol } = new URL(req.url);
    const postsUrl = new URL("/api/posts", `${protocol}${host}`);
    const resp = await fetch(postsUrl.href);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const data: Response = await resp.json();
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
