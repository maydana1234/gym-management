// components/organisms/PlanList.tsx
"use client";

import { useRouter } from "next/navigation";
import type { Plan } from "../../types/gimnasio";
import PlanCard from "./PlanCard";
import "./plans.css";

interface PlanListProps {
  plans: Plan[];
}

export default function PlanList({ plans }: PlanListProps) {
  const router = useRouter();
  return (
    <>
      {plans.map((plan, idx) => (
        <PlanCard
          key={plan.id ?? idx}
          plan={plan}
          onSelect={() => router.push("/miembros")}
        />
      ))}
    </>
  );
}