import { create } from "zustand";

interface DeleteModalStore {
  isOpen?: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string | null;
  setId: (id: string) => void;
}

const useDeleteModal = create<DeleteModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  id: null,
  setId: (id) => set({ id }),
}));

export default useDeleteModal;
