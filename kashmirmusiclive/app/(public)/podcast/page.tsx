"use client";

import { CompletePost } from "@/app/(protected)/admin/components/post-form";
import getPostsByCategory from "@/app/actions/getPostsByCategory";
import { Post } from "@/components/post";
import { Spinner } from "@/components/spinner";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PodcastPage = () => {
  const router = useRouter();

  const [posts, setPosts] = useState<CompletePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const fetchedPosts: CompletePost[] | null = await getPostsByCategory(
        "podcast"
      );
      if (fetchedPosts) {
        setPosts(fetchedPosts);
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        duration: 1500,
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center mt-40">
          <Spinner size="lg" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center lg:py-10">
        <h1 className="pb-4 text-lg font-semibold uppercase text-black/80">
          Latest in Podcast
        </h1>
      </div>
      {posts.length === 0 && (
        <div className="font-semibold text-center text-muted-foreground">
          Looks like there are no posts here.
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 mx-2 space-y-4 lg:mx-40">
        {posts.map((post) => (
          <div key={post.id} className="col-span-1">
            <Post
              title={post.title}
              category={post.category}
              imageUrl={post.imageUrl}
              author={post.author}
              date={post.date}
              onClick={() => router.push(`/post/${post.id}`)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PodcastPage;
