interface IconProps {
  symbol: string;
  color?: string;
  size?: number;
}

export default function Icon({ symbol, color = "#84cc16", size = 14 }: IconProps) {
  return (
    <span style={{ color, fontSize: size, lineHeight: 1, display: "inline-block" }}>
      {symbol}
    </span>
  );
}