"use client";

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
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

export type DocumentType = {
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

const AboutUsPage = () => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const router = useRouter();
  const [content, setContent] = useState<string>("");

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
    console.log(content);
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
        setContent(latestDoc.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  const editorKey = content ? "editor" : "editor-empty";

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <h1 className="py-8 text-sm font-semibold text-center uppercase text-muted-foreground">
          Customize your About Us page
        </h1>
        <Button onClick={handleOnClick}>Update</Button>
      </div>
      <Editor
        key={editorKey}
        initialContent={content}
        onChange={(value) => setContent(value)}
        theme="light"
      />
    </div>
  );
};

export default AboutUsPage;
