"use client";
import { SearchModal } from "@/components/search-modal";
import React, { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  // never run a model on the server (server side rendering)
  // because it might cause hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <SearchModal />
    </>
  );
};
