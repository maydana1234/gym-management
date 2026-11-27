"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./VistaPlanes.css";

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
}

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
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>(DEFAULT_PLANS);

  useEffect(() => {
    fetch("https://6b0045397fc363ccff09fc19.mockapi.io/plans")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          setPlans(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="plans-container">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="plan-card"
          onClick={() => router.push("/miembros")}
        >
          <h2>{plan.name}</h2>
          <p>{plan.price}</p>
          <ul>
            {String(plan.description || "")
              .split("|")
              .filter(Boolean)
              .map((item, idx) => (
                <li key={idx}>★ {item}</li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}