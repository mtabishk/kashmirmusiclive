"use client";

import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/firebase-config";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useMemo } from "react";

interface EditorProps {
  onChange: (jsonBlocks: Block[]) => void;
  initialContent?: PartialBlock[] | undefined;
  editable?: boolean;
  theme: "light" | "dark";
}

const Editor = ({ onChange, initialContent, editable, theme }: EditorProps) => {
  async function uploadFile(file: File) {
    try {
      if (file) {
        const fileName = uuidv4();
        const storageRef = ref(storage, `/uploads/${fileName}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
      }
      throw new Error("No file provided");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        duration: 1500,
      });
      return "";
    }
  }

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent ? initialContent : undefined,
    uploadFile,
  });

  return (
    <div>
      <BlockNoteView
        data-changing-font
        className="p-4"
        editor={editor}
        editable={editable}
        theme={theme}
        onChange={() => {
          onChange(editor.document);
        }}
      />
    </div>
  );
};

export default Editor;
