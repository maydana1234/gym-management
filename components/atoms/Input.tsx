import type { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        flex: 1,
        background: "transparent",
        border: "none",
        borderBottom: "1.5px dotted #84cc16",
        color: "#ffffff",
        fontSize: "12px",
        padding: "2px 4px",
        outline: "none",
        ...props.style,
      }}
    />
  );
}