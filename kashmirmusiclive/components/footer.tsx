import { Heart, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="py-6 border">
      <div className="flex items-center mx-4 lg:mx-10 justify-evenly">
        <p className="text-sm text-white/70">
          {`Copyright © ${year}`}{" "}
          <span className="underline">Kashmir Music Live</span> | All copyright
          to respective contributors
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link
            href="https://www.instagram.com/kashmirmusiclive"
            target="_blank"
          >
            <Instagram className="w-5 h-5 text-white/70" />
          </Link>
          <Link href="https://twitter.com/kashmirmusiclive" target="_blank">
            <Twitter className="w-5 h-5 text-white/70" />
          </Link>
        </div>
        <div className="hidden lg:block">
          <h1 className="text-sm text-white/70">
            Created with{" "}
            <span>
              <Heart className="inline w-5 h-5 text-red-500 animate-pulse" />
            </span>{" "}
            by{" "}
            <Link href="https://linktr.ee/mtabishk" target="_blank">
              <span className="text-sm underline text-white/70">mtabishk</span>
            </Link>
          </h1>
        </div>
      </div>
      <div className="block pt-4 text-center lg:hidden">
        <h1 className="text-sm text-white/70">
          Created with{" "}
          <span>
            <Heart className="inline w-5 h-5 text-white/70 animate-pulse" />
          </span>{" "}
          by{" "}
          <Link href="https://linktr.ee/mtabishk" target="_blank">
            <span className="text-sm underline text-white/70">mtabishk</span>
          </Link>
        </h1>
      </div>
    </div>
  );
};
