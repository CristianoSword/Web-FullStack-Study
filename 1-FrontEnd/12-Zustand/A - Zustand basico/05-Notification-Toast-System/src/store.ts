import { create } from "zustand";

type Toast = { id: string; title: string; message: string; expiresAt: number };

type ToastState = {
  toasts: Toast[];
  push: (input: { title: string; message: string }) => void;
  dismiss: (id: string) => void;
};

function id() {
  return Math.random().toString(16).slice(2);
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: ({ title, message }) => {
    const toast: Toast = {
      id: id(),
      title,
      message,
      expiresAt: Date.now() + 3500
    };
    set((s) => ({ toasts: [toast, ...s.toasts].slice(0, 5) }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== toast.id) })), 3600);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
}));

