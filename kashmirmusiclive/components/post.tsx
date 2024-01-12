import React from "react";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface PostProps {
  title: string;
  category: string;
  imageUrl: string;
  author: string;
  date: Timestamp;
  onClick?: () => void;
}

export const Post = ({
  title,
  category,
  imageUrl,
  author,
  date,
  onClick,
}: PostProps) => {
  return (
    <div
      onClick={onClick}
      className=" lg:h-[250px] flex flex-col bg-gray-50 lg:flex-row group hover:cursor-pointer"
    >
      <div className="h-[150px] lg:h-[250px] lg:w-[50%] relative overflow-hidden">
        <Image
          src={imageUrl}
          alt="Post Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center p-4 lg:mx-8">
        <h1 className="mt-4 text-2xl font-bold text-black">
          {title.length > 60 ? (
            <span>
              {`${title.slice(0, 60)} `}
              <span className="text-xs text-muted-foreground">read more</span>
            </span>
          ) : (
            title
          )}
        </h1>

        <div className="p-8">
          <h1 className="font-semibold uppercase text-md text-muted-foreground text-start">
            {category}
          </h1>
        </div>
        <h1 className="pt-2 text-xs font-semibold text-black">
          BY: {author.toUpperCase()} /{" "}
          <span className="text-black/70">
            {format(date.seconds * 1000, "PPP")}
          </span>
        </h1>
        <Separator className="w-[40vh] my-4 group-hover:bg-red-500" />
      </div>
    </div>
  );
};
