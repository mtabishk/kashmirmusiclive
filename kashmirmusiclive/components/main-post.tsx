import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import React from "react";

interface MainPostProps {
  title: string;
  category: string;
  imageUrl: string;
  author: string;
  date: Timestamp;
  onClick?: () => void;
}

export const MainPost = ({
  title,
  category,
  imageUrl,
  author,
  date,
  onClick,
}: MainPostProps) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-row bg-white hover:cursor-pointer"
    >
      <div className="h-[300px] w-[50%] relative overflow-hidden">
        <Image
          src={imageUrl}
          alt="Post Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col justify-between p-4 mx-8 w-[50%]">
        <h1 className="text-4xl font-bold text-black">
          {title.length > 120 ? (
            <span>
              {`${title.slice(0, 120)} `}
              <span className="text-xs text-muted-foreground">read more</span>
            </span>
          ) : (
            title
          )}
        </h1>
        <div className="mt-2">
          <h1 className="font-semibold uppercase text-md text-muted-foreground text-start">
            {category}
          </h1>
        </div>

        <h1 className="pt-4 text-xs font-semibold text-black">
          BY: {author?.toUpperCase()} /{" "}
          <span className="text-black/70">
            {format(date?.seconds * 1000, "PPP")}
          </span>
        </h1>
      </div>
    </div>
  );
};
