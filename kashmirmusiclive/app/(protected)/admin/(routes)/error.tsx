"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Image src="/error-dark.png" height="300" width="300" alt="Error" />
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      <Button asChild>
        <Link href="/admin">Go back</Link>
      </Button>
    </div>
  );
};

export default Error;
