import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = { email: string };

type AuthState = {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email) => set({ user: email ? { email } : null }),
      logout: () => set({ user: null })
    }),
    { name: "zustand-auth" }
  )
);

