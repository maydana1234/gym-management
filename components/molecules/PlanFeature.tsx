interface PlanFeatureProps {
  text: string;
}

export default function PlanFeature({ text }: PlanFeatureProps) {
  return (
    <li style={{ fontSize: "12px", color: "#ffffff", lineHeight: 1.45 }}>
      ★ {text}
    </li>
  );
}