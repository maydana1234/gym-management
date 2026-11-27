"use client";

import { useEffect, useState } from "react";
import { getPlans, Plan } from "../../services/api.ts";
import "./VistaPlanes.css";

const DEFAULT_PLANS: Plan[] = [
  {
    id: "std",
    name: "STANDARD",
    price: "40$ Per Year",
    description:
      "Add unlimited members|Dashboard|Whats'up integration|Data Backup every day|Gym revenue report|Email support",
  },
  {
    id: "prm",
    name: "PREMIUM",
    price: "50$ Per Year",
    description:
      "All Features in STANDARD|Workout Video page|Diet Plan Page",
  },
  {
    id: "gld",
    name: "GOLDEN",
    price: "60$ Per Year",
    description:
      "All Features in STANDARD|All Features in PREMIUM|Facebook integration|Instgram marketing page integration|Shop Page [ you can sell supplement & Protein ]|Email support",
  },
];

export default function VistaPlanes() {
  const [plans, setPlans] = useState<Plan[]>(DEFAULT_PLANS);

  useEffect(() => {
    getPlans()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPlans(data);
        }
      })
      .catch(() => {
        setPlans(DEFAULT_PLANS);
      });
  }, []);

  return (
    <section className="plan-screen">
      <div className="plan-screen__top">
        <div className="plan-screen__badge">⚡</div>
        <h1 className="plan-screen__title">Select Your Plan</h1>
        <p className="plan-screen__subtitle">7 Days Free Trial</p>
      </div>

      {plans.map((plan, idx) => {
        const features = (plan.description || "")
          .split("|")
          .map((f) => f.trim())
          .filter(Boolean);

        const priceText =
          typeof plan.price === "number"
            ? `${plan.price}$ ${plan.duration || "Per Year"}`
            : plan.price || "40$ Per Year";

        return (
          <div key={plan.id ?? idx} className="plan-box">
            <div className="plan-box__name">{plan.name || "STANDARD"}</div>
            <div className="plan-box__price">{priceText}</div>
            <ul className="plan-box__list">
              {features.map((feat, i) => (
                <li key={i} className="plan-box__item">
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}