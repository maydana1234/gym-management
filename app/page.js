"use client";
import { useState } from "react";
import PlansList from "../components/organisms/PlansList";
import MembersScreen from "../components/organisms/MembersScreen";
import AddMemberScreen from "../components/organisms/AddMemberScreen";

function PhoneShell({ title, children }) {
  return (
    <div className="flex flex-col items-center shrink-0">
      <div className="text-[11px] text-neutral-400 mb-2 font-medium">
        {title}
      </div>
      <div className="w-[375px] h-[740px] rounded-[42px] bg-black border-[3px] border-neutral-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Barra de estado superior estilo teléfono */}
        <div className="bg-black text-white px-5 pt-2.5 pb-1.5 flex items-center justify-between text-[11px] font-semibold shrink-0">
          <span>1:22</span>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span>📶</span>
            <span>📡</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Contenido de la pantalla */}
        <div className="flex-1 overflow-hidden flex flex-col">{children}</div>

        {/* Barra inferior estilo teléfono */}
        <div className="bg-black py-2 flex justify-center shrink-0">
          <div className="w-28 h-1 rounded-full bg-neutral-400" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [screen, setScreen] = useState("plans");
  const [showAllThree, setShowAllThree] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: "DORADO" });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  function handleSelectPlan(plan) {
    setSelectedPlan(plan);
    setShowAllThree(false);
    setScreen("members");
  }

  function goToStep(step) {
    setShowAllThree(false);
    setScreen(step);
  }

  const steps = [
    { id: "plans", label: "1. Plan", phoneTitle: "iPhone 14 - 4 (Plan)" },
    {
      id: "members",
      label: "2. Miembros",
      phoneTitle: "iPhone 14 - 5 (Miembros)",
    },
    {
      id: "add-member",
      label: "3. Agregar miembro",
      phoneTitle: "iPhone 14 - 6 (Agregar miembro)",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-[#0b0b0b] text-white flex flex-col">
      {/* Barra superior de navegación */}
      <header className="w-full bg-[#121212] border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between gap-2 flex-wrap shrink-0">
        <div className="flex items-center gap-2 flex-wrap">
          {steps.map((s) => {
            const isActive = !showAllThree && screen === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goToStep(s.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? "bg-[#84CC16] text-black"
                    : "bg-[#1e1e1e] text-neutral-200 hover:bg-[#2a2a2a]"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setShowAllThree((v) => !v)}
          className={`px-3.5 py-1.5 rounded-md text-xs font-bold border transition cursor-pointer ${
            showAllThree
              ? "bg-[#84CC16] text-black border-[#84CC16]"
              : "bg-[#141f07] text-[#84CC16] border-[#84CC16]/60 hover:bg-[#1d2e0a]"
          }`}
        >
          Ver las 3 pantallas juntas
        </button>
      </header>

      {/* Zona central */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-x-auto">
        {showAllThree ? (
          <div className="flex items-start justify-center gap-6 min-w-max py-2">
            <PhoneShell title="iPhone 14 - 4 (Plan)">
              <PlansList onSelectPlan={handleSelectPlan} />
            </PhoneShell>

            <PhoneShell title="iPhone 14 - 5 (Miembros)">
              <MembersScreen
                selectedPlan={selectedPlan}
                refreshTrigger={refreshTrigger}
                onOpenAddMember={() => goToStep("add-member")}
                onBackToPlans={() => goToStep("plans")}
              />
            </PhoneShell>

            <PhoneShell title="iPhone 14 - 6 (Agregar miembro)">
              <AddMemberScreen
                selectedPlan={selectedPlan}
                onBackToMembers={() => goToStep("members")}
                onMemberSaved={() => {
                  setRefreshTrigger((n) => n + 1);
                  goToStep("members");
                }}
              />
            </PhoneShell>
          </div>
        ) : (
          <PhoneShell
            title={steps.find((s) => s.id === screen)?.phoneTitle || "iPhone 14"}
          >
            {screen === "plans" && (
              <PlansList onSelectPlan={handleSelectPlan} />
            )}

            {screen === "members" && (
              <MembersScreen
                selectedPlan={selectedPlan}
                refreshTrigger={refreshTrigger}
                onOpenAddMember={() => goToStep("add-member")}
                onBackToPlans={() => goToStep("plans")}
              />
            )}

            {screen === "add-member" && (
              <AddMemberScreen
                selectedPlan={selectedPlan}
                onBackToMembers={() => goToStep("members")}
                onMemberSaved={() => {
                  setRefreshTrigger((n) => n + 1);
                  goToStep("members");
                }}
              />
            )}
          </PhoneShell>
        )}
      </div>
    </main>
  );
}