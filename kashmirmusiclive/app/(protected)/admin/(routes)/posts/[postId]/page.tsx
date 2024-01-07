import { PostForm } from "@/app/(protected)/admin/components/post-form";
import React from "react";

interface PostIdPageProps {
  params: {
    postId: string;
  };
}

const PostIdPage = ({ params }: PostIdPageProps) => {
  // fetch the post with the given id
  // return the post details or null if no post found
  let post = null;
  return (
    <>
      <PostForm initialData={post} />
    </>
  );
};

export default PostIdPage;
