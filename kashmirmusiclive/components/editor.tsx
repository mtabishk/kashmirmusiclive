"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/firebase-config";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  theme: "light" | "dark";
}

const Editor = ({ onChange, initialContent, editable, theme }: EditorProps) => {
  const handleUpload = async (file: File): Promise<string> => {
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
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? //@ts-expect-error
        (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      console.log("Editor Content Changed:", editor.topLevelBlocks);
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView className="p-4" editor={editor} theme={theme} />
    </div>
  );
};

export default Editor;
