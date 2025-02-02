"use client";
import { CompletePost } from "@/app/(protected)/admin/components/post-form";
import { Spinner } from "@/components/spinner";
import { db } from "@/firebase/firebase-config";
import { Separator } from "@radix-ui/react-separator";
import { format } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import { Instagram } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

import React, { useEffect, useMemo, useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { TwitterShareButton } from "next-share";
import { toast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";

interface PostPageProps {
  params: {
    postId: string;
  };
}

const PostPage = ({ params }: PostPageProps) => {
  const pathname = usePathname();

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
      content: JSON.parse(docSnap.data().content) as any,
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

  const pageUrl = pathname;

  if (!post) {
    return (
      <>
        <div className="flex items-center justify-center mt-40">
          <Spinner size="lg" />
        </div>
      </>
    );
  }

  const handleIgButtonClick = () => {
    navigator.clipboard.writeText(pageUrl);
    toast({
      title: "Post Link Copied!",
      description: "You can now paste it and share on Instagram",
    });
  };

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
        <div className="max-w-6xl px-2 pt-10 mx-auto md:px-6 lg:px-8">
          <div
            className="pt-10 prose prose-lg text-gray-900 ql-editor max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        <div className="flex flex-col items-center justify-center py-10 xl:py-20">
          <div className="flex justify-center space-x-6">
            <TwitterShareButton
              url={pageUrl}
              title={
                post.title.length > 280
                  ? post.title.substring(0, 270) + "..."
                  : post.title
              }
            >
              <BsTwitterX
                className="text-black hover:text-black/60"
                size={24}
              />
            </TwitterShareButton>
            <div
              onClick={handleIgButtonClick}
              className="text-pink-600 hover:text-pink-400 hover:cursor-pointer"
            >
              <Instagram size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
