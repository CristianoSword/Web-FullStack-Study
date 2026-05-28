import { create } from "zustand";

type CounterSlice = {
  count: number;
  inc: (by: number) => void;
};

type ProfileSlice = {
  name: string;
  setName: (name: string) => void;
};

type AppState = {
  counter: CounterSlice;
  profile: ProfileSlice;
};

export const useAppStore = create<AppState>((set) => ({
  counter: {
    count: 0,
    inc: (by) =>
      set((s) => ({ counter: { ...s.counter, count: s.counter.count + by } }))
  },
  profile: {
    name: "Anonimo",
    setName: (name) => set((s) => ({ profile: { ...s.profile, name } }))
  }
}));

