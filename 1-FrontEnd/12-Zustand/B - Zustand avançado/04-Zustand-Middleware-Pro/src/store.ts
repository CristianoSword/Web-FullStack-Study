import { create } from "zustand";

type LoggedState = {
  value: string;
  log: Array<{ at: string; value: string }>;
  setValue: (value: string) => void;
};

export const useLoggedStore = create<LoggedState>((set) => ({
  value: "",
  log: [],
  setValue: (value) =>
    set((s) => ({
      value,
      log: [{ at: new Date().toISOString(), value }, ...s.log]
    }))
}));

