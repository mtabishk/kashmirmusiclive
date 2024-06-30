"use client";

import { DocumentType } from "@/app/(protected)/admin/(routes)/about-us/page";
import { Spinner } from "@/components/spinner";
import { db } from "@/firebase/firebase-config";
import { PartialBlock } from "@blocknote/core";
import { collection, getDocs } from "firebase/firestore";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";

const AboutUsPage = () => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const [aboutUs, setAboutUs] = useState<DocumentType | null>(null);

  const fetchAboutUs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "aboutus"));
      let latestDoc: DocumentType | undefined;
      querySnapshot.forEach((doc) => {
        if (!latestDoc) {
          latestDoc = doc.data() as DocumentType;
        } else if (latestDoc && latestDoc.updatedAt < doc.data().updatedAt) {
          latestDoc = doc.data() as DocumentType;
        }
      });
      if (latestDoc) {
        setAboutUs(latestDoc);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  if (!aboutUs) {
    return (
      <>
        <div className="flex items-center justify-center mt-40">
          <Spinner size="lg" />
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center lg:mt-[76px] mx-4 lg:mx-40">
      <div>
        <Editor
          initialContent={JSON.parse(aboutUs.content) as PartialBlock[]}
          editable={false}
          onChange={() => {}}
          theme="light"
        />
      </div>
    </div>
  );
};

export default AboutUsPage;
