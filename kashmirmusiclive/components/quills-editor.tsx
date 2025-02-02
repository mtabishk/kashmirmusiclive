import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getRandomFileName } from "../lib/utils";

const ReactQuill: any = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    const { default: MagicUrl } = await import("quill-magic-url");
    RQ.Quill.register("modules/magicUrl", MagicUrl);
    const { default: QU } = await import("../lib/grispi.attachmentUploader.js");
    RQ.Quill.register("modules/imageUploader", QU);
    const { default: LoadingImage } = await import("../lib/blots/loadingImage");
    RQ.Quill.register({ "formats/imageBlot": LoadingImage });
    const { default: BF } = await import("quill-blot-formatter");
    RQ.Quill.register("modules/blotFormatter", BF);
    return function forwardRef({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  {
    ssr: false,
  }
);

export default function QuillsEditor({ value, setValue }: any) {
  const storage = getStorage();
  const rootDivRef = useRef(null);
  const modules = useMemo(
    () => ({
      magicUrl: true,
      blotFormatter: {},
      imageUploader: {
        upload: async (file: any) => {
          try {
            const fileName = getRandomFileName() + file.name;
            const storageRef = ref(storage, `/post-images/${fileName}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL;
          } catch (error) {
            console.error("Can't upload image", file);
            throw new Error("Can't upload image");
          }
        },
      },
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ color: [] }, { background: [] }],
          [
            { align: [] },
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video", "code-block"],
          ["clean"],
        ],
        handlers: {
          image: (e: any) => {
            return e;
          },
        },
      },
    }),
    [storage]
  );

  return (
    <div ref={rootDivRef}>
      <ReactQuill
        style={{ height: "600px" }}
        modules={modules}
        value={value}
        onChange={setValue}
        placeholder="Write something awesome..."
      />
    </div>
  );
}
