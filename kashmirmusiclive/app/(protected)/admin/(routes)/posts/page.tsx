"use client";

import { Post, PostTable } from "@/components/post-table";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase/firebase-config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PostsPage = () => {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const postsCollection = collection(db, "posts");
    const unsubscribe = onSnapshot(
      query(postsCollection, orderBy("updatedAt", "desc")),
      (snapshot) => {
        const updatedPosts: Post[] = snapshot.docs.map((doc) => {
          const post = doc.data();
          return {
            id: doc.id,
            title: post.title,
            category: post.category,
            date: post.date,
            published: post.published,
          };
        });
        setPosts(updatedPosts);
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleOnCreate = () => {
    router.push("/admin/posts/new");
  };

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
    <>
      <div className="flex flex-row items-center justify-between pt-4">
        <h1 className="font-semibold text-muted-foreground">
          Total Posts:{" "}
          <span className="text-xl font-bold text-white/90">12</span>
        </h1>
        <Button onClick={handleOnCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </div>
      <div className="pt-8">
        <PostTable posts={posts} />
      </div>
    </>
  );
};

export default PostsPage;
