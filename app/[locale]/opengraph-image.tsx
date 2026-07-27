import { ImageResponse } from "next/og";
import { isLocale } from "@/lib/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mainsches Hub — AI Operating System";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";

  const subtitle =
    locale === "de"
      ? "Lokale und Cloud-KI, Dateien und adaptive Workflows — in einem kontrollierten Hub."
      : "Local and cloud AI, files, and adaptive workflows — in one controlled hub.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0b0b0c",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(212,175,55,0.14), transparent 45%)",
          color: "#f4f3ef",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#d4af37",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: "#d4af37",
              borderRadius: 9999,
            }}
          />
          AI Operating System
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>
            Mainsches Hub
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.4,
              color: "#a7a6a0",
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#7c7b73",
          }}
        >
          <div>mainsches.com</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#a7a6a0",
            }}
          >
            Switzerland
          </div>
        </div>
      </div>
    ),
    size,
  );
}
