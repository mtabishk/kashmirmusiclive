"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const PostsPage = () => {
  const router = useRouter();

  const handleOnCreate = () => {
    router.push("/admin/posts/new");
  };

  return (
    <div className="flex flex-row items-center justify-between pt-4">
      <h1 className="font-semibold text-muted-foreground">
        Total Posts: <span className="text-xl font-bold text-white/90">12</span>
      </h1>
      <Button onClick={handleOnCreate}>
        <Plus className="w-4 h-4 mr-2" />
        Create Post
      </Button>
    </div>
  );
};

export default PostsPage;
