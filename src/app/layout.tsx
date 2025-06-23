import "./globals.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "./lib/registry";

export const metadata: Metadata = {
  title: "Aya Dreams Project",
  description: "Aya Dreams Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
