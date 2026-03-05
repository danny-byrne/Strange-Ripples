import "./globals.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "./lib/registry";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Aya Dreams Project",
  description: "Aya Dreams Project",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
