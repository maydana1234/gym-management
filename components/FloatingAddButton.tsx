"use client";

import { usePathname, useRouter } from "next/navigation";

export default function FloatingAddButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname !== "/miembros") return null;

  return (
    <button
      type="button"
      onClick={() => router.push("/miembros/nuevo")}
      aria-label="Agregar miembro"
      style={{
        position: "fixed",
        right: "22px",
        bottom: "22px",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#ef4444",
        color: "#ffffff",
        border: "2px solid #ffffff",
        fontSize: "32px",
        lineHeight: "1",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
        zIndex: 99999,
      }}
    >
      +
    </button>
  );
}