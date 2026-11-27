import Logo from "../atoms/Logo";
import PlanList from "../organisms/PlanList";
import type { Plan } from "../../types/gimnasio";

interface PlansTemplateProps {
  plans: Plan[];
  loading: boolean;
  error: string;
}

const FALLBACK_PLANS: Plan[] = [
  {
    id: "1",
    nombre: "STANDARD",
    precio: "40$ Per Year",
    caracteristicas: [
      "Add unlimited members",
      "Dashboard",
      "Whats'up integration",
      "Data Backup every day",
      "Gym revenue report",
      "Email support",
    ],
  },
  {
    id: "2",
    nombre: "PREMIUM",
    precio: "50$ Per Year",
    caracteristicas: [
      "All Features in STANDARD",
      "Workout Video page",
      "Diet Plan Page",
    ],
  },
  {
    id: "3",
    nombre: "GOLDEN",
    precio: "60$ Per Year",
    caracteristicas: [
      "All Features in STANDARD",
      "All Features in PREMIUM",
      "Facebook integration",
      "Instgram marketing page integration",
      "Shop Page [ you can sell supplement & Protein ]",
      "Email support",
    ],
  },
];

export default function PlansTemplate({
  plans,
  loading,
  error,
}: PlansTemplateProps) {
  const displayPlans = plans.length > 0 ? plans : FALLBACK_PLANS;

  return (
    <main className="app-shell">
      <section className="plans-container">
        <div className="plans-header">
          <Logo size={56} />
          <h1 className="plans-header__title">Select Your Plan</h1>
          <p className="plans-header__trial">7 Days Free Trial</p>
        </div>

        {loading && <p style={{ textAlign: "center", fontSize: 12 }}>Loading...</p>}
        {!loading && error && (
          <p style={{ textAlign: "center", fontSize: 11, color: "#a3a3a3" }}>
            {error} (mostrando planes por defecto)
          </p>
        )}
        {!loading && <PlanList plans={displayPlans} />}
      </section>
    </main>
  );
}