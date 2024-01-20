"use client";

import { Heart, Instagram } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export const Footer = () => {
  const router = useRouter();
  const year = new Date().getFullYear();
  return (
    <div className="py-6 bg-red-700 border border-red-500/30">
      <div className="flex items-center mx-4 lg:mx-10 justify-evenly">
        <p className="text-sm text-white/70">
          {`Copyright © ${year}`}{" "}
          <span
            onClick={() => router.push("/")}
            className="underline hover:cursor-pointer"
          >
            Kashmir Music Live
          </span>{" "}
          | All copyright to respective contributors
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link href="https://twitter.com/koshurmusiclive" target="_blank">
            <BsTwitterX className="w-5 h-5 text-white/70" />
          </Link>
          <Link
            href="https://www.instagram.com/kashmirmusiclive"
            target="_blank"
          >
            <Instagram className="w-5 h-5 text-white/70" />
          </Link>
        </div>
        <div className="hidden lg:block">
          <h1 className="text-sm text-white/70">
            Created with{" "}
            <span>
              <Heart fill="black" className="inline w-5 h-5 animate-pulse" />{" "}
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
            <Heart fill="black" className="inline w-5 h-5 animate-pulse" />
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
