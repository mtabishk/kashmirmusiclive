import { MainPost } from "@/components/main-post";
import { Post } from "@/components/post";

export default function Home() {
  return (
    <div className="bg-white/90 pt-[84px] lg:pt-[184px] pb-[84px]">
      <div className="grid grid-cols-1 gap-4 mx-4 space-y-8 lg:mx-40 lg:grid-cols-3">
        <div className="hidden col-span-3 lg:block">
          <MainPost />
        </div>
        <div className="block col-span-1 lg:hidden">
          <Post />
        </div>
        <div className="col-span-1">
          <Post />
        </div>
        <div className="col-span-1">
          <Post />
        </div>
        <div className="col-span-1">
          <Post />
        </div>
      </div>
    </div>
  );
}
