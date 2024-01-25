"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { routes } from "@/lib/routes";
import useSearchModal from "@/hooks/useSearchModal";

const TOP_OFFSET = 10;

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { isOpen, onOpen } = useSearchModal();

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
      className={`fixed bg-red-700 z-[9999] top-0 left-0 w-full flex-col items-center justify-center transition-all ease-in-out duration-150 bg-black/90 hidden md:block`}
      style={{ height: navbarHeight }}
    >
      {!scrollY && (
        <>
          <h2 className="py-8 text-4xl font-bold text-center text-white">
            Kashmir Music <span className="text-black">Live</span>
          </h2>
          <Separator className="bg-red-500/30" />
        </>
      )}

      <div className="flex items-center justify-between px-8 py-4">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <h2
            className={cn(
              "text-xl font-bold text-white",
              scrollY ? "opacity-100" : "opacity-0"
            )}
          >
            KM<span className="text-black">Live</span>
          </h2>
        </div>

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
          {!isOpen ? (
            <Search className="text-white" />
          ) : (
            <X className="text-white" />
          )}
        </div>
      </div>
    </nav>
  );
};
