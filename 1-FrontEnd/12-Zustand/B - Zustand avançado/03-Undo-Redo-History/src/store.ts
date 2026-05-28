import { create } from "zustand";

type HistoryState = {
  past: string[];
  present: string;
  future: string[];
  set: (value: string) => void;
  undo: () => void;
  redo: () => void;
};

export const useHistoryStore = create<HistoryState>((set, get) => ({
  past: [],
  present: "",
  future: [],
  set: (value) =>
    set((s) => ({ past: [...s.past, s.present], present: value, future: [] })),
  undo: () => {
    const { past, present, future } = get();
    const prev = past[past.length - 1];
    if (prev === undefined) return;
    set({
      past: past.slice(0, -1),
      present: prev,
      future: [present, ...future]
    });
  },
  redo: () => {
    const { past, present, future } = get();
    const next = future[0];
    if (next === undefined) return;
    set({
      past: [...past, present],
      present: next,
      future: future.slice(1)
    });
  }
}));

