"use client";

import useDeleteModal from "@/hooks/useDeleteModal";
import { Button } from "./ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export const DeleteModal = () => {
  const { onClose, isOpen, id } = useDeleteModal();
  const router = useRouter();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const onConfirm = async () => {
    if (id) {
      const deletePostRef = doc(db, "posts", id);
      await deleteDoc(deletePostRef);

      onClose();

      toast({
        title: "Post is deleted.",
        duration: 1500,
      });

      router.push(`/admin/posts`);
    }
  };

  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80" />
        <Dialog.Content
          className="
            fixed
            drop-shadow-md
            border
            border-gray-400/40
            rounded-md
            top-[50%]
            left-[50%]
            max-h-full
            h-full
            md:h-auto
            md:max-h-[85vh]
            w-full
            md:w-[90vw]
            md:max-w-[450px]
            translate-x-[-50%]
            translate-y-[-50%]
            bg-black
            p-[25px]
            focus:outline-none
        "
        >
          <Dialog.Title className="mb-4 text-xl font-bold text-center">
            Are you absolutely sure?
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-sm text-center">
            This action cannot be undone. This will permanently delete your post
            from our servers.
          </Dialog.Description>
          <div className="flex flex-row items-center justify-end space-x-4">
            <Button onClick={onConfirm} type="button" variant="secondary">
              Confirm
            </Button>
            <Button onClick={onClose} type="button" variant="secondary">
              Cancel
            </Button>
          </div>
          <Dialog.Close asChild>
            <button
              className="
                text-neutral-400
                hover:text-white
                absolute
                top-[10px]
                right-[10px]
                inline-flex
                h-[25px]
                w-[25px]
                appearance-none
                items-center
                justify-center
                rounded-full
                focus:outline-none
            "
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
