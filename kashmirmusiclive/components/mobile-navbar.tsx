import React from "react";
import { Titan_One } from "next/font/google";
import { cn } from "@/lib/utils";
import { AlignJustify, Search } from "lucide-react";

const titanOne = Titan_One({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

export const MobileNavBar = () => {
  return (
    <div className="md:hidden fixed top-0 left-0 w-full bg-black/90 h-[60px]">
      <div className="flex items-center justify-between px-4 py-4">
        <div>
          <AlignJustify className="text-white" />
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
