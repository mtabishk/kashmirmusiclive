"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AlignJustify, Search, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { routes } from "@/lib/routes";
import { usePathname, useRouter } from "next/navigation";
import useSearchModal from "@/hooks/useSearchModal";
import Link from "next/link";

export const MobileNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { isOpen, onOpen } = useSearchModal();

  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden fixed bg-red-700 top-0 left-0 w-full bg-black/90 h-[60px] z-[9999]">
      <div className="flex items-center justify-between px-4 py-4">
        <div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <AlignJustify className="text-white" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-red-700 ">
              <SheetHeader>
                <SheetTitle>
                  <div
                    onClick={() => {
                      router.push("/");
                      setOpen(false);
                    }}
                  >
                    <h2 className="py-8 text-4xl font-bold text-center text-white">
                      Kashmir Music <span className="text-black">Live</span>
                    </h2>
                  </div>
                </SheetTitle>
                <SheetDescription>
                  <div className="flex flex-col items-start pt-10 space-y-4">
                    {routes.map((route) => (
                      <div
                        key={route.name}
                        onClick={() => {
                          router.push(route.path);
                          setOpen(false);
                        }}
                        className="px-4 cursor-pointer"
                      >
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
        <Link href="/">
          <h2 className="text-xl font-bold text-white">
            KM<span className="text-black">Live</span>
          </h2>
        </Link>
        <div onClick={onOpen}>
          {!isOpen ? (
            <Search className="text-white" />
          ) : (
            <X className="text-white" />
          )}
        </div>
      </div>
    </div>
  );
};
