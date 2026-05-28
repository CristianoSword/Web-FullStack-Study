import { create } from "zustand";

type RealtimeState = {
  connected: boolean;
  events: Array<{ at: string; value: number }>;
  connect: () => void;
  disconnect: () => void;
};

let timer: number | undefined;

export const useRealtimeStore = create<RealtimeState>((set, get) => ({
  connected: false,
  events: [],
  connect: () => {
    if (get().connected) return;
    set({ connected: true });
    timer = window.setInterval(() => {
      set((s) => ({
        events: [{ at: new Date().toISOString(), value: Math.random() }, ...s.events]
      }));
    }, 800);
  },
  disconnect: () => {
    if (timer) window.clearInterval(timer);
    timer = undefined;
    set({ connected: false });
  }
}));

