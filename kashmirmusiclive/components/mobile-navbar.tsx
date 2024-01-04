"use client";

import React from "react";
import { Titan_One } from "next/font/google";
import { cn } from "@/lib/utils";
import { AlignJustify, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { routes } from "@/lib/routes";
import { usePathname } from "next/navigation";

const titanOne = Titan_One({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

export const MobileNavBar = () => {
  const pathname = usePathname();
  return (
    <div className="md:hidden fixed top-0 left-0 w-full bg-black/90 h-[60px]">
      <div className="flex items-center justify-between px-4 py-4">
        <div>
          <Sheet>
            <SheetTrigger>
              <AlignJustify className="text-white" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <h2
                    className={cn(
                      " text-center py-8 text-4xl font-bold text-white",
                      titanOne.className
                    )}
                  >
                    Kashmir Music Live
                  </h2>
                </SheetTitle>
                <SheetDescription>
                  <div className="flex flex-col items-start pt-10 space-y-4">
                    {routes.map((route) => (
                      <div key={route.name} className="px-4 cursor-pointer">
                        <p
                          className={cn(
                            "text-sm font-bold uppercase hover:text-white",
                            pathname === route.path
                              ? "text-white"
                              : "text-white/70"
                          )}
                        >
                          {route.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <h2 className={cn("text-xl font-bold text-white", titanOne.className)}>
          KML
        </h2>
        <div>
          <Search className="text-white" />
        </div>
      </div>
    </div>
  );
};
