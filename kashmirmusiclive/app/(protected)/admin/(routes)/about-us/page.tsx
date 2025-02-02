"use client";

import QuillsEditor from "@/components/quills-editor";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/firebase/firebase-config";
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

export type DocumentType = {
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

const AboutUsPage = () => {
  const router = useRouter();
  const [content, setContent] = useState<any | undefined>();

  const handleOnClick = async (e: any) => {
    e.preventDefault();
    e.persist();
    try {
      const newPostRef = doc(collection(db, "aboutus"));
      const data = {
        content: content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(newPostRef, data);
      toast({
        title: "Updated successfully",
        duration: 1500,
      });
      router.push("/admin/dashboard");
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        duration: 1500,
      });
    }
  };

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
        setContent(JSON.parse(latestDoc.content) as any[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <h1 className="py-8 text-sm font-semibold text-center uppercase text-muted-foreground">
          Customize your About Us page
        </h1>
        <Button onClick={handleOnClick}>Update</Button>
      </div>
      <div className="h-[650px] bg-white mt-2">
        <QuillsEditor value={content} setValue={setContent} />
      </div>
    </div>
  );
};

export default AboutUsPage;
