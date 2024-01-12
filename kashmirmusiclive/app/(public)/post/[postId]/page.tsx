"use client";
import { CompletePost } from "@/app/(protected)/admin/components/post-form";
import { Spinner } from "@/components/spinner";
import { db } from "@/firebase/firebase-config";
import { Separator } from "@radix-ui/react-separator";
import { format } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import { Facebook, Instagram, Twitter } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

interface PostPageProps {
  params: {
    postId: string;
  };
}

const PostPage = ({ params }: PostPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const [post, setPost] = useState<CompletePost | null>(null);

  const fetchPost = async () => {
    const docRef = doc(db, "posts", params.postId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return null;
    }
    const fetchedPost: CompletePost = {
      id: docSnap.id,
      author: docSnap.data().author,
      category: docSnap.data().category,
      content: docSnap.data().content,
      createdAt: docSnap.data().createdAt,
      date: docSnap.data().date,
      imageUrl: docSnap.data().imageUrl,
      published: docSnap.data().published,
      title: docSnap.data().title,
      uid: docSnap.data().uid,
      updatedAt: docSnap.data().updatedAt,
    };
    setPost(fetchedPost);
  };

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!post) {
    return (
      <>
        <div className="flex items-center justify-center mt-40">
          <Spinner size="lg" />
        </div>
      </>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-white h-80vh">
      <Image
        src={post.imageUrl}
        alt="Post Image"
        className="object-cover w-full h-full"
        width={1000}
        height={500}
      />

      <div className="flex flex-col items-center py-8 space-y-8">
        <h1 className="text-sm font-semibold uppercase text-black/80">
          {post.category}
        </h1>
        <h1 className="mx-4 text-xl font-bold text-center uppercase lg:text-3xl lg:mx-40 text-black/80">
          {post.title}
        </h1>
        <Separator className="w-[40vh] h-[1.5px] bg-red-500" />
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-sm font-semibold text-black/80">
            By {post.author}
          </h1>
          <h1 className="text-sm font-semibold text-muted-foreground">
            {format(post.date.seconds * 1000, "PPP")}
          </h1>
        </div>
        <div className="mx-4 lg:mx-40">
          <Editor
            initialContent={post.content}
            editable={false}
            onChange={() => {}}
            theme="light"
          />
        </div>
        <div className="flex flex-col items-center justify-center py-10 xl:py-20">
          <p className="mb-4 text-lg font-semibold text-muted-foreground">
            Share this post on socials
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fkashmirmusiclive.com%2Fpost%2F${params.postId}`}
              rel="nofollow noopener"
              target="_blank"
              title="Facebook"
              className="text-blue-500 hover:text-blue-600"
            >
              <Facebook size={24} />
            </Link>
            <Link
              href={`https://twitter.com/intent/tweet?via=TheShahbadR&amp;text=${encodeURIComponent(
                post.title
              )}&amp;url=https%3A%2F%2Fkashmirmusiclive.com%2Fpost%2F${
                params.postId
              }`}
              rel="nofollow noopener"
              target="_blank"
              className="text-blue-400 hover:text-blue-500"
            >
              <Twitter size={24} />
            </Link>
            <Link
              href="https://www.instagram.com/theshahbadreview/"
              rel="nofollow noopener"
              target="_blank"
              className="text-pink-500 hover:text-pink-600"
            >
              <Instagram size={24} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
