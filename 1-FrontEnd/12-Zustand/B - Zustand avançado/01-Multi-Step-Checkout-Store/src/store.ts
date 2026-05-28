import { create } from "zustand";

type Step = 1 | 2 | 3;
type CheckoutData = { email: string; address: string };

type CheckoutState = {
  step: Step;
  data: CheckoutData;
  setField: <K extends keyof CheckoutData>(key: K, value: CheckoutData[K]) => void;
  next: () => void;
  back: () => void;
};

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  step: 1,
  data: { email: "", address: "" },
  setField: (key, value) => set((s) => ({ data: { ...s.data, [key]: value } })),
  next: () => set({ step: (Math.min(3, get().step + 1) as Step) }),
  back: () => set({ step: (Math.max(1, get().step - 1) as Step) })
}));

