import { ImageResponse } from "next/og";

export const alt = "Justin Nelson — AI Engineer at GIEBEL FilTec";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#080808",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#8f8f88",
            fontFamily: "monospace",
          }}
        >
          justinnelson
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              backgroundImage:
                "linear-gradient(105deg, #9a9a96 0%, #849498 30%, #8a9890 50%, #908898 72%, #9a9a96 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Justin Nelson
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#a6a6a0",
              lineHeight: 1.4,
            }}
          >
            AI Engineer at GIEBEL FilTec · Incoming UGA CS + Math · Atlanta, GA, USA
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: "6px",
            width: "320px",
            borderRadius: "3px",
            backgroundImage:
              "linear-gradient(105deg, #5a486c 0%, #3a5862 50%, #2a4838 100%)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
