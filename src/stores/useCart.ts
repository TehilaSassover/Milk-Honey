// stores/useCart.ts
import {create} from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/api";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (p: Product, qty?: number) => void;
  removeItem: (id: number) => void;
  setQuantity: (id: number, qty: number) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (p, qty = 1) => {
        const items = [...get().items];
        const idx = items.findIndex(i => i.id === p.id);
        if (idx >= 0) {
          items[idx].quantity += qty;
        } else {
          items.push({ id: p.id, title: p.title, price: p.price, image: p.image, quantity: qty });
        }
        set({ items });
      },
      removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
      setQuantity: (id, qty) => {
        const items = get().items.map(i => (i.id === id ? { ...i, quantity: qty } : i));
        set({ items });
      },
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
    }),
    {
      name: "gki-cart",
      storage: typeof window !== "undefined" ? 
        require("zustand/middleware").createJSONStorage(() => localStorage) : undefined,
    }
  )
);
