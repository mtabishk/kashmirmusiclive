"use client";

import { DashboardCard } from "@/app/(protected)/admin/components/dashboard-card";
import { AuthContext } from "@/providers/auth-context-provider";
import { BadgeCheck } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const DashboardPage = () => {
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState<string | null | undefined>(undefined);
  const [isVerified, setIsVerified] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setEmail(auth?.currentUser?.email);
    setIsVerified(auth?.currentUser?.emailVerified);
  }, [auth, auth?.currentUser, isVerified]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <div className="flex flex-row items-center justify-end my-4">
        <p className="text-muted-foreground">
          Logged in as:{" "}
          <span className="font-bold underline text-muted-foreground">
            {email || "loading..."}
          </span>
        </p>
        {isVerified ? (
          <BadgeCheck className="ml-2 text-muted-foreground" />
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-4 py-4 lg:grid-cols-2">
        <DashboardCard title="Users" description="Manage users" count={2} />
        <DashboardCard title="Posts" description="Total posts" count={12} />
        <DashboardCard
          title="Published"
          description="Total published posts "
          count={10}
        />
        <DashboardCard
          title="Not Published"
          description="Total not published posts "
          count={2}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
