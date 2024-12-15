"use client";
import { CompletePost } from "@/app/(protected)/admin/components/post-form";
import getAllPosts from "@/app/actions/getAllPosts";
import { Post } from "@/components/post";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useMemo, useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const [posts, setPosts] = useState<CompletePost[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const fetchedPosts: CompletePost[] | null = await getAllPosts();
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filteredPosts: CompletePost[] = useMemo(
    () =>
      posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      ),
    [posts, search]
  );

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
    <div>
      <div className="flex flex-col items-center justify-center pb-10 mx-4 text-xl lg:mx-40 lg:text-4xl text-black/70">
        <div>
          Showing results for{" "}
          <span className="font-bold text-black/80">{search}</span>
        </div>
        <div className="my-10 bg-gray-50">
          <Input
            className="w-[80vw] md:w-[60vw] bg-gray-100 border-2 focus:border-none"
            placeholder="Type to search"
            value={search}
            onChange={onChange}
          />
        </div>
      </div>
      {posts.length === 0 && (
        <div className="font-semibold text-center text-muted-foreground">
          Looks like there are no posts here related to your search.
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 mx-4 space-y-4 lg:mx-40">
        {filteredPosts.map((post) => (
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
    </div>
  );
};

export function SearchPage() {
  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <SearchBar />
    </Suspense>
  );
}
