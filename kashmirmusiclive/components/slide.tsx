import Image from "next/image";
import React from "react";

interface SlideProps {
  imageUrl: string;
  title: string;
}

const Slide: React.FC<SlideProps> = ({ imageUrl, title }) => {
  return (
    <div className="relative">
      <Image
        src={imageUrl}
        alt={title}
        className="object-cover w-full h-[30vh] md:h-[40vw]"
        width={0}
        height={0}
        sizes="40vw"
      />
      <div className="absolute inset-0 flex items-center justify-center pb-10 translate-y-4 lg:translate-y-0">
        <div className="px-2 py-4 bg-black/80">
          <h2 className="text-xl font-bold text-white md:text-3xl">{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Slide;
