import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserLoginResponse } from "../modules/auth/types";

interface UserStore {
  user: UserLoginResponse | null;
  setUser: (data: UserLoginResponse) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      setUser: (data) => {
          console.table(data)
        return set({ user: data })},

      clearUser: () => set({ user: null }),
    }),
    {
      name: "election-user", // storage key
    }
  )
);
