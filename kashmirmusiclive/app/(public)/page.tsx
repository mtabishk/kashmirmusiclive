import { MainPost } from "@/components/main-post";
import { SecondaryPost } from "@/components/secondary-post";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-4 mx-4 space-y-8 lg:mx-40 lg:grid-cols-3">
      <div className="hidden col-span-3 lg:block">
        <MainPost />
      </div>
      <div className="block col-span-1 lg:hidden">
        <SecondaryPost />
      </div>
      <div className="col-span-1">
        <SecondaryPost />
      </div>
      <div className="col-span-1">
        <SecondaryPost />
      </div>
      <div className="col-span-1">
        <SecondaryPost />
      </div>
    </div>
  );
}
