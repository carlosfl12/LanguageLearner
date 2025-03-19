import { create } from "zustand"

interface UserState {
  userId: string | null;
  xp: number;
  setUser: (id: string) => void;
  setXP: (xp: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  xp: 0,
  setUser: (id) => set({ userId: id }),
  setXP: (xp) => set({ xp }),
}));