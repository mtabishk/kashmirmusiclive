"use client";

import { DocumentType } from "@/app/(protected)/admin/(routes)/about-us/page";
import { Spinner } from "@/components/spinner";
import { db } from "@/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const AboutUsPage = () => {
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
      <div className="max-w-6xl px-2 pt-10 mx-auto md:px-6 lg:px-8">
        <div
          className="pt-10 prose prose-lg text-gray-900 ql-editor max-w-none"
          dangerouslySetInnerHTML={{ __html: aboutUs.content }}
        />
      </div>
    </div>
  );
};

export default AboutUsPage;
