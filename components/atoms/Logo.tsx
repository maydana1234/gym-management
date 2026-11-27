interface LogoProps {
  size?: number;
}

export default function Logo({ size = 36 }: LogoProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "9999px",
        backgroundColor: "#111111",
        border: "2px solid #84cc16",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: Math.round(size * 0.45),
      }}
    >
      ⚡
    </div>
  );
}