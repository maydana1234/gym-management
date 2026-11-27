import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

export default function FormField({ label, children }: FormFieldProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
        fontSize: "12px",
      }}
    >
      <label style={{ color: "#84cc16", fontWeight: 700, whiteSpace: "nowrap" }}>
        {label}
      </label>
      {children}
    </div>
  );
}