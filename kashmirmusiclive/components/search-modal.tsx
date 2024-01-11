import useSearchModal from "@/hooks/useSearchModal";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const SearchModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = useSearchModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleOnClick = () => {
    onClose();
    router.push("/search");
  };

  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-red-900/20 backdrop-blur-sm" />
        <Dialog.Content
          className="
              fixed
              drop-shadow-md
              border
              border-red-700/20
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
              bg-red-700
              p-[25px]
              focus:outline-none
          "
        >
          <Dialog.Title className="mb-4 text-xl font-bold text-center ">
            Search
          </Dialog.Title>
          <div>
            <form onSubmit={handleOnClick}>
              <div className="flex flex-row items-center justify-end space-x-4">
                <Input
                  className="flex-grow text-black bg-white border-none outine-white"
                  placeholder="Type to search"
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
