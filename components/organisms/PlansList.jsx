"use client";
import { useState } from "react";
import GymLogo from "../atoms/GymLogo";

const PLANS = [
  {
    id: "standard",
    name: "ESTÁNDAR",
    priceLabel: "40 dólares al año",
    features: [
      "Agregar miembros ilimitados",
      "Panel de control",
      "Integración de WhatsApp",
      "Copia de seguridad de datos diaria",
      "Informe de ingresos del gimnasio",
      "Soporte por correo electrónico",
    ],
  },
  {
    id: "premium",
    name: "PREMIUM",
    priceLabel: "50 dólares al año",
    features: [
      "Todas las funciones en ESTÁNDAR",
      "Página de videos de entrenamiento",
      "Página del plan de dieta",
    ],
  },
  {
    id: "golden",
    name: "DORADO",
    priceLabel: "60 dólares al año",
    features: [
      "Todas las funciones en ESTÁNDAR",
      "Todas las funciones en PREMIUM",
      "Integración con Facebook",
      "Integración de la página de marketing de Instagram",
      "Página de la tienda",
      "Soporte por correo electrónico",
    ],
  },
];

export default function PlansList({ onSelectPlan, onSelect, onChoosePlan }) {
  const [pickedPlan, setPickedPlan] = useState(PLANS[2]);

  function handleContinue() {
    const fn = onSelectPlan || onSelect || onChoosePlan;
    if (typeof fn === "function") {
      fn(pickedPlan);
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-[#090909] text-white overflow-y-auto px-4 py-3">
      <div className="flex flex-col items-center shrink-0">
        <GymLogo size={54} />
        <h1 className="mt-1.5 text-lg font-bold text-[#84CC16] tracking-tight">
          Selecciona tu plan
        </h1>
        <p className="text-[11px] font-semibold text-[#84CC16] mt-0.5">
          Prueba gratuita de 7 días
        </p>
      </div>

      <div className="mt-3 space-y-3 pb-2">
        {PLANS.map((plan) => {
          const isSelected = pickedPlan?.id === plan.id;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setPickedPlan(plan)}
              className={`w-full text-left rounded-2xl px-4 py-3 transition cursor-pointer ${
                isSelected
                  ? "bg-[#152008] border-2 border-[#84CC16]"
                  : "bg-[#0d0d0d] border border-[#84CC16]/75 hover:border-[#84CC16] hover:bg-[#141a0a]"
              }`}
            >
              <div className="text-center">
                <div className="text-sm font-extrabold text-[#84CC16] tracking-wide">
                  {plan.name}
                </div>
                <div className="text-xs font-bold text-white mt-0.5">
                  {plan.priceLabel}
                </div>
              </div>

              <ul className="mt-2 space-y-1 text-[11px] text-neutral-100">
                {plan.features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#84CC16] text-[10px] leading-4 shrink-0">
                      ★
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-2 pb-2 flex flex-col items-center gap-2 shrink-0">
        <div className="text-[11px] text-neutral-300">
          Seleccionado:{" "}
          <span className="text-[#84CC16] font-extrabold">
            {pickedPlan?.name}
          </span>
        </div>

        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-2.5 rounded-xl bg-[#84CC16] hover:bg-[#93dc22] text-black font-extrabold text-xs tracking-tight transition cursor-pointer shadow-md"
        >
          Continuar a Miembros →
        </button>
      </div>
    </div>
  );
}