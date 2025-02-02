"use client";

import {
  CompletePost,
  PostForm,
} from "@/app/(protected)/admin/components/post-form";
import { Spinner } from "@/components/spinner";
import { db } from "@/firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface PostIdPageProps {
  params: {
    postId: string;
  };
}

const PostIdPage = ({ params }: PostIdPageProps) => {
  const postId = params.postId;
  const [post, setPost] = useState<CompletePost | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchPost = async () => {
    const docRef = doc(db, "posts", postId);
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
    if (postId === "new") {
      setPost(null);
      return;
    } else {
      fetchPost();
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

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
      <PostForm initialData={post} />
    </>
  );
};

export default PostIdPage;
