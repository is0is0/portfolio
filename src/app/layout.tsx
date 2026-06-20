import type { Metadata } from "next";
import "./globals.css";

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
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#000000",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", margin: 0 }}>
            Under Construction
          </h1>
          <p style={{ fontSize: "1rem", marginTop: "1rem", opacity: 0.85 }}>
            This portfolio is temporarily offline.
          </p>
        </main>
      </body>
    </html>
  );
}
