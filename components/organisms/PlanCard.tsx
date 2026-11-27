// components/organisms/PlanCard.tsx
import type { Plan } from "../../types/gimnasio";
import PlanFeature from "../molecules/PlanFeature";

interface PlanCardProps {
  plan: Plan;
  onSelect: () => void;
}

export default function PlanCard({ plan, onSelect }: PlanCardProps) {
  const title = (plan.nombre || plan.name || "STANDARD").toUpperCase();
  const price = plan.precio ?? plan.price ?? "40$ Per Year";
  const priceLabel = typeof price === "number" ? `${price}$ Per Year` : String(price);
  const features =
    plan.caracteristicas && plan.caracteristicas.length > 0
      ? plan.caracteristicas
      : (plan.description || "")
          .split("|")
          .map((item) => item.trim())
          .filter(Boolean);

  return (
    <article className="plan-card" onClick={onSelect}>
      <div className="plan-card__title">{title}</div>
      <div className="plan-card__price">{priceLabel}</div>
      <ul className="plan-card__features">
        {features.map((feat, i) => (
          <PlanFeature key={i} text={feat} />
        ))}
      </ul>
    </article>
  );
}