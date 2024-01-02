"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Titan_One } from "next/font/google";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const titanOne = Titan_One({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

const TOP_OFFSET = 20;

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Reviews",
    path: "/reviews",
  },
  {
    name: "Features",
    path: "/features",
  },
  {
    name: "Lists",
    path: "/lists",
  },
  {
    name: "The Pitch",
    path: "/pitch",
  },
  {
    name: "Best of 2023",
    path: "/best",
  },
];

export const Navbar = () => {
  const pathname = usePathname();

  const [scrollY, setScrollY] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setScrollY(true);
      } else {
        setScrollY(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarHeight = scrollY ? "8vh" : "22vh";

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex-col items-center justify-center transition-all ease-in-out duration-150 bg-black/90`}
      style={{ height: navbarHeight }}
    >
      {!scrollY && (
        <>
          <h2
            className={cn(
              " text-center py-8 text-4xl font-bold text-white",
              titanOne.className
            )}
          >
            Kashmir Music Live
          </h2>
          <Separator />
        </>
      )}

      <div className="flex items-center justify-between px-8 py-4">
        <h2
          className={cn(
            "text-xl font-bold text-white",
            titanOne.className,
            scrollY ? "opacity-100" : "opacity-0"
          )}
        >
          KML
        </h2>

        <ul className="flex items-center justify-center">
          {routes.map((route) => (
            <li key={route.name} className="px-4 cursor-pointer">
              <p
                className={cn(
                  "text-xs font-bold uppercase hover:text-white",
                  pathname === route.path ? "text-white" : "text-white/70"
                )}
              >
                {route.name}
              </p>
            </li>
          ))}
        </ul>
        <div>
          <Search className="text-white" />
        </div>
      </div>
    </nav>
  );
};
