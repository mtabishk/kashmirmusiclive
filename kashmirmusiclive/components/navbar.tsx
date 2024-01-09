"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Titan_One } from "next/font/google";
import { routes } from "@/lib/routes";
import useSearchModal from "@/hooks/useSearchModal";

const titanOne = Titan_One({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

const TOP_OFFSET = 20;

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { onOpen } = useSearchModal();

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

  const navbarHeight = scrollY ? "60px" : "164px";

  return (
    <nav
      className={`fixed z-[99999] top-0 left-0 w-full flex-col items-center justify-center transition-all ease-in-out duration-150 bg-black/90 hidden md:block`}
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
            <li
              onClick={() => router.push(route.path)}
              key={route.name}
              className="px-4 cursor-pointer"
            >
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
        <div onClick={onOpen}>
          <Search className="text-white" />
        </div>
      </div>
    </nav>
  );
};
