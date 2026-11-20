const PLAN_NAME_LABELS = {
  ESTÁNDAR: "STANDARD",
  ESTANDAR: "STANDARD",
  "DE PRIMERA CALIDAD": "PREMIUM",
  DORADO: "GOLDEN",
};

const FEATURE_LABELS = {
  "Añadir miembros ilimitados": "Add unlimited members",
  Panel: "Dashboard",
  "Integración con WhatsApp": "Whats'up integration",
  "Copia de seguridad de datos diaria": "Data Backup every day",
  "Informe de ingresos del gimnasio": "Gym revenue report",
  "Soporte por correo electrónico": "Email support",
  "Todas las funciones en ESTÁNDAR": "All Features in STANDARD",
  "Página de vídeos de entrenamiento": "Workout Video page",
  "Página del plan de dieta": "Diet Plan Page",
  "Todas las funciones en PREMIUM": "All Features in PREMIUM",
  "Integración con Facebook": "Facebook integration",
  "Integración de la página de marketing de Instagram":
    "Instgram marketing page integration",
  "Página de la tienda": "Shop Page [ you can sell supplement & Protein ]",
};

function formatPlanName(name = "") {
  const clean = name.trim();
  return PLAN_NAME_LABELS[clean.toUpperCase()] || PLAN_NAME_LABELS[clean] || clean;
}

function formatFeature(item = "") {
  const clean = item.trim();
  return FEATURE_LABELS[clean] || clean;
}

export default function PlanCard({ plan, selected, onSelect }) {
  const displayName = formatPlanName(plan.name);

  return (
    <div
      onClick={() => onSelect(plan)}
      className={`cursor-pointer rounded-2xl border p-5 transition ${
        selected
          ? "border-[#84CC16] bg-[#161e0e] shadow-[0_0_15px_rgba(132,204,22,0.2)]"
          : "border-[#84CC16]/70 bg-[#0f0f0f] hover:border-[#84CC16]"
      }`}
    >
      <div className="text-center">
        <h3 className="text-lg font-bold tracking-wide text-[#84CC16]">
          {displayName}
        </h3>
        <p className="mt-1 text-base font-semibold text-white">
          {plan.pricePerYear}$ Per Year
        </p>
      </div>

      {Array.isArray(plan.features) && plan.features.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm text-neutral-200">
          {plan.features.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-white">★</span>
              <span>{formatFeature(item)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}