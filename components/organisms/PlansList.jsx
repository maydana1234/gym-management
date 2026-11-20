"use client";
import { useEffect, useState } from "react";
import PlanCard from "../molecules/PlanCard";

export default function PlansList({ selectedPlan, onSelectPlan }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PLANS_API_URL}/plans`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudieron cargar los planes");
        return res.json();
      })
      .then((data) => {
        setPlans(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-sm text-neutral-400">Cargando planes...</p>;
  if (error) return <p className="text-sm text-red-400">{error}</p>;

  return (
    <div className="space-y-4">
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          selected={selectedPlan?.id === plan.id}
          onSelect={onSelectPlan}
        />
      ))}
    </div>
  );
}