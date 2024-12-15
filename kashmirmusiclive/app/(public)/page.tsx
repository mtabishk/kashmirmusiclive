"use client";

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
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import Link from "next/link";
import Slide from "@/components/slide";
import { HomeCategory } from "@/components/home-category";

export default function Home() {
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

  const topPosts = posts.slice(0, 3);

  const categories = [
    "NEWS",
    "ANALYSES",
    "REVIEWS",
    "INTERVIEWS",
    "FEATURES",
    "LISTS",
    "PODCAST",
  ];

  const groupedPosts: { [key: string]: CompletePost[] } = {};

  posts.forEach((post) => {
    const category = post.category.toUpperCase();
    if (!groupedPosts[category]) {
      groupedPosts[category] = [post];
    } else {
      groupedPosts[category].push(post);
    }
  });

  console.log(groupedPosts);

  return (
    <>
      <div className="lg:py-10" />
      {posts.length === 0 ? (
        <div className="font-semibold text-center text-muted-foreground">
          Looks like there are no posts here.
        </div>
      ) : (
        <div className="min-h-screen mx-auto mt-0 space-y-20 lg:-mt-20 ">
          <Swiper
            slidesPerView={1}
            modules={[Scrollbar, EffectFade, Autoplay]}
            scrollbar={{ draggable: true }}
            effect="fade"
            autoplay={{ delay: 2000, disableOnInteraction: true }}
            loop={true}
          >
            {topPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <Link key={post.id} href={`/post/${post.id}`}>
                  <Slide imageUrl={post.imageUrl} title={post.title} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {categories.map((category) => (
            <HomeCategory
              key={category}
              category={category}
              posts={groupedPosts[category.toUpperCase()] || []}
            />
          ))}
        </div>
      )}
    </>
  );
}
