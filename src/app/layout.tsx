import type { Metadata } from "next";
import "./globals.css";
import { ConstructionGate } from "@/components/ConstructionGate";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { themeInitScript } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Under Construction",
  description: "This portfolio is temporarily under construction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ConstructionGate>
          <ThemeSwitch />
          {children}
        </ConstructionGate>
      </body>
    </html>
  );
}
