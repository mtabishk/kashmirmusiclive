import React from "react";
import Image from "next/image";
import { convertToSlug } from "../lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  imageUrl: string;
  title: string;
}

interface HomeCategoryProps {
  category: string;
  posts: Post[];
}

interface OtherPostProps {
  id: string;
  imageUrl: string;
  postTitle: string;
}

export const HomeCategory: React.FC<HomeCategoryProps> = ({
  category,
  posts,
}) => {
  const router = useRouter();

  if (!posts || posts.length === 0) {
    return null;
  }

  const [mainPost, ...restPosts] = posts;
  const otherPosts = restPosts.slice(0, 4);

  return (
    <>
      {/* Desktop view */}
      <div className="hidden lg:block max-w-6xl pb-10 mx-auto bg-[#fcfcfc] pt-20 px-8 shadow-lg">
        <div className="flex flex-col w-full px-4">
          <h1 className="text-xl font-bold text-black uppercase lg:text-3xl">
            {category}
          </h1>
          <hr className="w-full my-6 border-t border-gray-800" />
          <div className="flex flex-row space-x-8">
            <Link href={`/post/${mainPost.id}`}>
              <div className="flex-1 transition group hover:cursor-pointer hover:scale-95">
                <Image
                  src={mainPost.imageUrl}
                  alt={mainPost.title}
                  className="object-cover w-full h-[20vw]"
                  width={300}
                  height={150}
                  sizes="50vw"
                />
                <h1 className="pt-2 text-xl font-bold text-black group-hover:text-red-600">
                  {mainPost.title}
                </h1>
              </div>
            </Link>
            <div className="flex flex-col flex-1 space-y-4">
              {otherPosts.map((post) => (
                <OtherPost
                  key={post.id}
                  id={post.id}
                  imageUrl={post.imageUrl}
                  postTitle={post.title}
                />
              ))}
            </div>
          </div>
          <hr className="w-full my-6 border-t border-gray-800" />
          <div className="flex flex-row items-center justify-end">
            <button
              className="px-4 py-2 text-lg  font-bold text-white uppercase transition duration-300 bg-red-700 rounded-md hover:bg-[#332a0f] hover:cursor-pointer"
              onClick={() => router.push(`/${convertToSlug(category)}`)}
            >
              VIEW MORE
            </button>
          </div>
        </div>
      </div>
      {/* Mobile view */}
      <div className="max-w-6xl px-2 pt-10 pb-10 mx-auto shadow-lg lg:hidden bg-gray-50 md:pt-20 md:px-6 md:pb-6">
        <h1 className="mb-4 text-xl font-bold text-black uppercase">
          {category}
        </h1>
        <div className="flex flex-col space-y-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <div className="transition group hover:cursor-pointer hover:scale-95">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  className="object-cover w-full h-[30vh] rounded-md"
                  width={300}
                  height={150}
                />
                <h1 className="pt-2 text-lg font-bold text-black group-hover:text-red-600">
                  {post.title}
                </h1>
              </div>
            </Link>
          ))}

          <div className="flex justify-center">
            <button
              className="px-4 py-2 text-lg font-bold text-white uppercase transition duration-300 bg-red-700 rounded-md hover:bg-[#332a0f] hover:cursor-pointer"
              onClick={() => router.push(`/${convertToSlug(category)}`)}
            >
              VIEW MORE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const OtherPost: React.FC<OtherPostProps> = ({
  id,
  imageUrl,
  postTitle,
}) => {
  return (
    <Link href={`/post/${id}`}>
      <div className="flex flex-row space-x-4 transition group hover:scale-95 hover:cursor-pointer">
        <div>
          <Image
            src={imageUrl}
            alt={imageUrl}
            className="object-cover w-full h-[5vw]"
            width={100}
            height={80}
            sizes="5vw"
          />
        </div>
        <div>
          <h1 className="pt-2 text-xl font-bold text-black group-hover:text-red-600">
            {postTitle}
          </h1>
        </div>
      </div>
    </Link>
  );
};
