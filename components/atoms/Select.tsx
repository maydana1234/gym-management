import type { SelectHTMLAttributes } from "react";

export default function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      style={{
        backgroundColor: "#000000",
        color: "#84cc16",
        border: "1.5px solid #84cc16",
        borderRadius: "12px",
        padding: "5px 6px",
        fontSize: "11px",
        fontWeight: 700,
        outline: "none",
        ...props.style,
      }}
    />
  );
}