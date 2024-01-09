"use client";
import { AuthContext } from "@/providers/auth-context-provider";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { NavMenu } from "../components/navmenu";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth?.currentUser === null) {
      router.push("/admin");
    }
  }, [router, auth?.currentUser]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      {auth?.currentUser ? (
        <>
          <NavMenu />
          <div className="pb-8 mx-4 lg:mx-40">{children}</div>
        </>
      ) : null}
    </div>
  );
}
