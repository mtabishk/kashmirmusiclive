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
      <div className="bg-white/90 pt-[84px] lg:pt-[184px] pb-[84px] min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  );
}
