import { create } from "zustand";

interface useAuthStoreProps {
  isAuthenticated: boolean;
  role: string | null;
  login: (role: string) => void;
  logout: () => void;
}

const useAuthStore = create<useAuthStoreProps>((set) => ({
  isAuthenticated: false,
  role: null,
  login: (role: string) => set({ isAuthenticated: true, role }),
  logout: () => set({ isAuthenticated: false, role: null }),
}));

export default useAuthStore;
