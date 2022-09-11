/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

interface InlinePostProps {
  title: string;
  createdTime: string;
}

export default function InlinePost(props: InlinePostProps) {
  return (
    <div class={tw`flex p-4 justify-between shadow-md bg-white`}>
      <p class={tw`flex-grow-1 font-bold text-xl`}>{props.title}</p>
      <p class={tw`text-md`}>
        {new Date(props.createdTime).toLocaleString()}
      </p>
    </div>
  );
}
