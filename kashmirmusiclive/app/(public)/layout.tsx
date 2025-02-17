import { Footer } from "@/components/footer";
import { MobileNavbar } from "@/components/mobile-navbar";
import { Navbar } from "@/components/navbar";
import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <MobileNavbar />
      <div className="bg-white lg:pt-1 pt-40 pb-[84px] min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  );
}
