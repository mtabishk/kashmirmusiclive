"use client";

import { MainPost } from "@/components/main-post";
import { SecondaryPost } from "@/components/secondary-post";
import { useEffect, useState } from "react";
import { CompletePost } from "../(protected)/admin/components/post-form";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { Spinner } from "@/components/spinner";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [posts, setPosts] = useState<CompletePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const q = query(
        collection(db, "posts"),
        where("published", "==", true),
        orderBy("updatedAt", "desc"),
        limit(4)
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

  const [firstPost, ...restPosts] = posts;

  return (
    <>
      <div className="flex items-center justify-center lg:py-10">
        <h1 className="text-lg font-semibold uppercase text-black/80">
          Most Recents
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 mx-2 space-y-4 lg:mx-40 lg:grid-cols-3">
        <div className="hidden col-span-3 lg:block">
          <MainPost
            title={firstPost.title}
            category={firstPost.category}
            imageUrl={firstPost.imageUrl}
            author={firstPost.author}
            date={firstPost.date}
            onClick={() => router.push(`/post/${firstPost.id}`)}
          />
        </div>

        {restPosts.map((post) => (
          <div key={post.id} className="hidden col-span-1 lg:block">
            <SecondaryPost
              title={post.title}
              category={post.category}
              imageUrl={post.imageUrl}
              author={post.author}
              date={post.date}
              onClick={() => router.push(`/post/${post.id}`)}
            />
          </div>
        ))}

        <div className="block lg:hidden">
          {posts.map((post) => (
            <div key={post.id} className="col-span-1 my-4">
              <SecondaryPost
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
    </>
  );
}
