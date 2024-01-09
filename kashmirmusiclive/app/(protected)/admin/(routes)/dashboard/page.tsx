"use client";

import { DashboardCard } from "@/app/(protected)/admin/components/dashboard-card";
import { Spinner } from "@/components/spinner";
import { db } from "@/firebase/firebase-config";
import { AuthContext } from "@/providers/auth-context-provider";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { BadgeCheck } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const DashboardPage = () => {
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState<string | null | undefined>(undefined);
  const [isVerified, setIsVerified] = useState<boolean | undefined>(undefined);

  const [numUsers, setNumUsers] = useState(0);
  const [numPosts, setNumPosts] = useState(0);
  const [numPublishedPosts, setNumPublishedPosts] = useState(0);
  const [numUnpublishedPosts, setNumUnpublishedPosts] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setEmail(auth?.currentUser?.email);
    setIsVerified(auth?.currentUser?.emailVerified);
  }, [auth, auth?.currentUser, isVerified]);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        setIsLoading(true);

        const usersCollection = collection(db, "users");
        const postsCollection = collection(db, "posts");
        const publishedPostQuery = query(
          collection(db, "posts"),
          where("published", "==", true)
        );
        const unpublishedPostQuery = query(
          collection(db, "posts"),
          where("published", "==", false)
        );

        const [
          usersSnapshot,
          postsSnapshot,
          publishedPostSnapshot,
          unpublishedPostSnapshot,
        ] = await Promise.all([
          getCountFromServer(usersCollection),
          getCountFromServer(postsCollection),
          getCountFromServer(publishedPostQuery),
          getCountFromServer(unpublishedPostQuery),
        ]);

        setNumUsers(usersSnapshot.data().count);
        setNumPosts(postsSnapshot.data().count);
        setNumPublishedPosts(publishedPostSnapshot.data().count);
        setNumUnpublishedPosts(unpublishedPostSnapshot.data().count);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getDashboardData();
  }, []);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center pt-8">
          <Spinner size="lg" />
        </div>
      </>
    );
  }

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
        <DashboardCard
          title="Users"
          description="Manage users"
          count={numUsers}
        />
        <DashboardCard
          title="Posts"
          description="Total posts"
          count={numPosts}
        />
        <DashboardCard
          title="Published"
          description="Total published posts "
          count={numPublishedPosts}
        />
        <DashboardCard
          title="Not Published"
          description="Total not published posts "
          count={numUnpublishedPosts}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
