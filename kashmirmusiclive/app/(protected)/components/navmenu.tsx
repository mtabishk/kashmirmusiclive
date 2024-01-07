"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "@/providers/auth-context-provider";
import React, { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const routes = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    name: "Posts",
    path: "/admin/posts",
  },
  {
    name: "Users",
    path: "/admin/users",
  },
];

export const NavMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  const auth = useContext(AuthContext);

  return (
    <div className="flex flex-row items-center justify-between w-full p-3 overflow-x-auto border-b border-neutral-600 bg-neutral-800">
      <div
        className="cursor-pointer hover:opacity-90"
        onClick={() => router.push("/admin/dashboard")}
      >
        <Avatar>
          <AvatarImage src="/logo.jpg" />
          <AvatarFallback>KML</AvatarFallback>
        </Avatar>
      </div>
      <ul className="flex flex-row items-center justify-center space-x-4">
        {routes.map((route) => (
          <li
            key={route.path}
            onClick={() => router.push(route.path)}
            className="px-4 cursor-pointer"
          >
            <p
              className={cn(
                "text-xs lg:text-sm font-bold uppercase hover:text-white",
                pathname === route.path ? "text-white" : "text-white/70"
              )}
            >
              {route.name}
            </p>
          </li>
        ))}
      </ul>
      <div>
        <Button
          className="rounded-full "
          variant="default"
          onClick={() => auth?.signOut()}
        >
          <LogOut />
        </Button>
      </div>
    </div>
  );
};
