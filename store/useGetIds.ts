import { create } from "zustand";

interface UseGetIdsStoreProps {
  institutionId: string | null;
  userId: string | null;
  setinstitutionId: (id: string) => void;
  setUserId: (id: string) => void;
}

const useGetIdsStore = create<UseGetIdsStoreProps>((set) => ({
  institutionId: null, // Initial value is null or an empty string if preferred
  userId: null, // Initial value is null or an empty string if preferred

  setinstitutionId: (id) => set({ institutionId: id }),
  setUserId: (id) => set({ userId: id }),
}));

export default useGetIdsStore;
