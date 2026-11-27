"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../components/organisms/members.css";

const FALLBACK_PLANS = [
  {
    name: "STANDARD",
    price: "40$ Per Year",
    features: ["Add unlimited members", "Dashboard", "Whats'up integration", "Data Backup every day", "Gym revenue report", "Email support"],
  },
  {
    name: "PREMIUM",
    price: "50$ Per Year",
    features: ["All Features in STANDARD", "Workout Video page", "Diet Plan Page"],
  },
  {
    name: "GOLDEN",
    price: "60$ Per Year",
    features: ["All Features in STANDARD", "All Features in PREMIUM", "Facebook integration", "Instgram marketing page integration", "Shop Page [ you can sell supplement & Protein ]", "Email support"],
  },
];

export default function PlansPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<any[]>(FALLBACK_PLANS);

  useEffect(() => {
    fetch("https://6b0045397fc363ccff09fc19.mockapi.io/plans")
      .then(async (response) => {
        if (!response.ok) throw new Error();
        const data = await response.json();
        if (Array.isArray(data) && data.length) {
          setPlans(
            data.map((p, i) => ({
              name: p.name && !String(p.name).toUpperCase().startsWith("NAME ") ? p.name : FALLBACK_PLANS[i]?.name || "PLAN",
              price: p.price || FALLBACK_PLANS[i]?.price || "",
              features: Array.isArray(p.features) && p.features.length ? p.features : FALLBACK_PLANS[i]?.features || [],
            }))
          );
        }
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  return (
    <main className="app-shell">
      <section className="members-screen plans-screen">
        <div className="gym-logo">TRAINING<br />⚡<br />CENTER</div>
        <h1 className="plans-title">Select Your Plan</h1>
        <p className="plans-sub">7 Days Free Trial</p>
        <div className="plans-list">
          {plans.map((plan, idx) => (
            <div key={idx} className="plan-card" onClick={() => router.push("/miembros")}>
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">{plan.price}</div>
              <ul>
                {plan.features.map((f: string, i: number) => (
                  <li key={i}>★ {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}