import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "lime" | "dark" | "outline";
}

export default function Button({
  variant = "outline",
  style,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    lime: { backgroundColor: "#84cc16", color: "#000000", border: "none" },
    dark: { backgroundColor: "#000000", color: "#ffffff", border: "none" },
    outline: {
      backgroundColor: "#000000",
      color: "#84cc16",
      border: "1.5px solid #84cc16",
    },
  };

  return (
    <button
      {...props}
      style={{
        borderRadius: "10px",
        padding: "6px 14px",
        fontWeight: 700,
        fontSize: "12px",
        cursor: "pointer",
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}