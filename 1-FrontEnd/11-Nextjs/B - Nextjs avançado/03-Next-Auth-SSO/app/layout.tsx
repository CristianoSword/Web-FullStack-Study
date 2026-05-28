import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Next.js Project",
  description: "Study project"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

