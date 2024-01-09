"use client";

import { CompletePost } from "@/app/(protected)/admin/components/post-form";
import { Post } from "@/components/post";
import { Spinner } from "@/components/spinner";
import { db } from "@/firebase/firebase-config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const NewsPage = () => {
  const router = useRouter();

  const [posts, setPosts] = useState<CompletePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const q = query(
        collection(db, "posts"),
        where("category", "==", "news"),
        where("published", "==", true),
        orderBy("updatedAt", "desc")
      );
      const querySnapshot = await getDocs(q);

      const fetchedPosts: CompletePost[] = [];

      querySnapshot.forEach((doc) => {
        fetchedPosts.push({
          id: doc.id,
          author: doc.data().author,
          category: doc.data().category,
          content: doc.data().content,
          createdAt: doc.data().createdAt,
          date: doc.data().date,
          imageUrl: doc.data().imageUrl,
          published: doc.data().published,
          title: doc.data().title,
          uid: doc.data().uid,
          updatedAt: doc.data().updatedAt,
        });
      });
      setPosts(fetchedPosts);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
          Latest
        </h1>
      </div>
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

export default NewsPage;
