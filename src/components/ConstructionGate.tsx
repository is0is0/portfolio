"use client";

import { useEffect, useRef, useState } from "react";

const PASSWORD = "letme1n";
const STORAGE_KEY = "portfolio_unlocked";

export function ConstructionGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const bufferRef = useRef("");

  useEffect(() => {
    const isUnlocked = localStorage.getItem(STORAGE_KEY) === "true";
    setUnlocked(isUnlocked);

    if (isUnlocked) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      bufferRef.current = (bufferRef.current + e.key).slice(-PASSWORD.length);
      if (bufferRef.current === PASSWORD) {
        localStorage.setItem(STORAGE_KEY, "true");
        setUnlocked(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (unlocked === true) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000000",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        zIndex: 9999,
      }}
    >
      <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", margin: 0 }}>
        Under Construction
      </h1>
      <p style={{ fontSize: "1rem", marginTop: "1rem", opacity: 0.85 }}>
        This portfolio is temporarily offline.
      </p>
    </div>
  );
}
