import { Footer } from "@/components/footer";
import { MobileNavBar } from "@/components/mobile-navbar";
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
      <MobileNavBar />
      {children}
      <Footer />
    </>
  );
}
