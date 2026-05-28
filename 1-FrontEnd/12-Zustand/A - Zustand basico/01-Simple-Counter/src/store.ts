import { create } from "zustand";
import { persist } from "zustand/middleware";

type CounterState = {
  count: number;
  inc: (by: number) => void;
  dec: (by: number) => void;
  reset: () => void;
};

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      inc: (by) => set((s) => ({ count: s.count + by })),
      dec: (by) => set((s) => ({ count: s.count - by })),
      reset: () => set({ count: 0 })
    }),
    { name: "zustand-counter" }
  )
);

