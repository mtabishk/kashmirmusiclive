"use client";

import useSearchModal from "@/hooks/useSearchModal";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SearchModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = useSearchModal();

  const [search, setSearch] = useState("");

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleOnClick = () => {
    onClose();
    router.push(`/search?q=${search}`);
  };

  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-red-900/20 backdrop-blur-sm z-[9999]" />
        <Dialog.Content
          className="
              fixed
              z-[99999]
              drop-shadow-md
              border
              border-red-700/20
              top-[50%]
              left-[50%]
              max-h-full
              rounded-md
              h-full
              md:h-auto
              md:max-h-[85vh]
              w-full
              md:w-[90vw]
              md:max-w-[450px]
              translate-x-[-50%]
              translate-y-[-50%]
              bg-red-700
              p-[25px]
              focus:outline-none
          "
        >
          <Dialog.Title className="mb-4 text-xl font-bold text-center ">
            Search any post by title
          </Dialog.Title>
          <div>
            <form onSubmit={handleOnClick}>
              <div className="flex flex-row items-center justify-end space-x-4">
                <Input
                  className="flex-grow text-black bg-white border-0 border-none focus-visible:border-0 focus-visible:ring-2"
                  placeholder="Type to search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button type="submit">
                  <Search />
                </Button>
              </div>
            </form>
            <h2 className="mt-4 text-sm text-center">No recent searches</h2>
          </div>
          <Dialog.Close asChild>
            <button
              className="
                  text-white
                  hover:text-white/80
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
