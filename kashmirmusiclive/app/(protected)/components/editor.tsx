"use client";

import { useTheme } from "next-themes";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  theme: "light" | "dark";
}

const Editor = ({ onChange, initialContent, editable, theme }: EditorProps) => {
  const handleUpload = async (file: File) => {
    // const response = await edgestore.publicFiles.upload({
    //   file,
    // });
    // return response.url;
    return "";
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView className="p-2" editor={editor} theme={theme} />
    </div>
  );
};

export default Editor;
