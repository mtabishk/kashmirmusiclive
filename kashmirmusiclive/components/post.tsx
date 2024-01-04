import Image from "next/image";
import React from "react";
import { Separator } from "./ui/separator";

export const Post = () => {
  return (
    <div className="flex flex-col bg-white group hover:cursor-pointer">
      <Image
        src="https://media.pitchfork.com/photos/6596cb34b71ad418cd382e79/2:1/w_1920,c_limit/pitchfork-review-template.png"
        alt="Post Image"
        className="object-cover w-full"
        height="200"
        width="200"
      />
      <div className="flex flex-col items-center justify-center p-4 mx-8">
        <h1 className="text-2xl font-bold text-black">
          Jeff Tweedy on Rock Criticism, the Pitfalls of Music Snobbery, and His
          New Book
        </h1>
        <h1 className="pt-4 text-sm text-black">
          The musician and author discusses World Within a Song, in which he
          writes about 50 songs that rearranged his brain, Wilco’s new album,
          and more.
        </h1>
        <h1 className="pt-4 text-xs font-semibold text-black">
          BY: PITCHFORK / <span className="text-black/70">AN HOUR AGO </span>
        </h1>
        <Separator className="w-full my-4 group-hover:bg-red-500" />
      </div>
    </div>
  );
};
