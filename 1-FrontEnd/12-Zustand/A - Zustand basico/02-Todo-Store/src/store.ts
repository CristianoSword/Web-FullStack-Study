import { create } from "zustand";
import { persist } from "zustand/middleware";

type Filter = "all" | "active" | "done";

type Todo = { id: string; title: string; done: boolean };

type TodoState = {
  items: Todo[];
  filter: Filter;
  add: (title: string) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  setFilter: (filter: Filter) => void;
};

function id() {
  return Math.random().toString(16).slice(2);
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      items: [],
      filter: "all",
      add: (title) =>
        set((s) => ({ items: [...s.items, { id: id(), title, done: false }] })),
      toggle: (id) =>
        set((s) => ({
          items: s.items.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        })),
      remove: (id) => set((s) => ({ items: s.items.filter((t) => t.id !== id) })),
      setFilter: (filter) => set({ filter })
    }),
    { name: "zustand-todos" }
  )
);

