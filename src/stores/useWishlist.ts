// stores/useWishlist.ts
import {create} from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  ids: number[];
  toggle: (id: number) => void;
  isSaved: (id: number) => boolean;
  clear: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const ids = get().ids.includes(id) ? get().ids.filter(i => i !== id) : [...get().ids, id];
        set({ ids });
      },
      isSaved: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    {
      name: "gki-wishlist",
      storage: typeof window !== "undefined"
        ? {
            getItem: (name) => {
              const item = localStorage.getItem(name);
              return item ? JSON.parse(item) : null;
            },
            setItem: (name, value) => {
              localStorage.setItem(name, JSON.stringify(value));
            },
            removeItem: (name) => {
              localStorage.removeItem(name);
            },
          }
        : undefined,
    }
  )
);
