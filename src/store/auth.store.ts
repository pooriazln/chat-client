import { create } from "zustand";

interface IAuthStore {
  user?: User;
  setUser: (user: User) => void;
  token?: string;
  setToken: (token: string) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  setUser: (user: User) => {
    set({ user });
  },

  token: "",
  setToken: (token: string) => {
    set({ token });
  },
}));
