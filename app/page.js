"use client";
import { useState } from "react";
import GymLogo from "../components/atoms/GymLogo";
import PhoneFrame from "../components/molecules/PhoneFrame";
import PlansList from "../components/organisms/PlansList";
import MembersScreen from "../components/organisms/MembersScreen";
import AddMemberScreen from "../components/organisms/AddMemberScreen";

export default function HomePage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeScreen, setActiveScreen] = useState("plan");
  const [showAllThree, setShowAllThree] = useState(false);
  const [refreshMembers, setRefreshMembers] = useState(0);

  const planScreenView = (
    <PhoneFrame label="iPhone 14 - 4 (Plan)">
      <section className="flex flex-col h-full bg-[#090909] text-white px-3.5 py-3 justify-between overflow-y-auto">
        <div className="space-y-3">
          <header className="text-center space-y-1">
            <div className="flex justify-center">
              <GymLogo size={54} />
            </div>
            <h1 className="text-lg font-bold text-[#84CC16]">Select Your Plan</h1>
            <p className="text-xs text-[#84CC16]/90">7 Days Free Trial</p>
          </header>

          <PlansList
            selectedPlan={selectedPlan}
            onSelectPlan={setSelectedPlan}
          />
        </div>

        <div className="pt-3 space-y-1.5 shrink-0">
          {selectedPlan && (
            <p className="text-[11px] text-center text-neutral-300">
              Selected:{" "}
              <strong className="text-[#84CC16]">{selectedPlan.name}</strong>
            </p>
          )}
          <button
            type="button"
            onClick={() => setActiveScreen("members")}
            className="w-full py-2 rounded-xl bg-[#84CC16] hover:bg-[#9be327] text-black font-bold text-xs transition cursor-pointer"
          >
            Continue to Members →
          </button>
        </div>
      </section>
    </PhoneFrame>
  );

  const membersScreenView = (
    <PhoneFrame label="iPhone 14 - 5 (Members)">
      <MembersScreen
        selectedPlan={selectedPlan}
        onOpenAddMember={() => setActiveScreen("add-member")}
        onBackToPlans={() => setActiveScreen("plan")}
        refreshTrigger={refreshMembers}
      />
    </PhoneFrame>
  );

  const addMemberScreenView = (
    <PhoneFrame label="iPhone 14 - 6 (Add Member)">
      <AddMemberScreen
        selectedPlan={selectedPlan}
        onBackToMembers={() => setActiveScreen("members")}
        onMemberCreated={() => setRefreshMembers((prev) => prev + 1)}
      />
    </PhoneFrame>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Controles de navegación y vista */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#111111] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setShowAllThree(false);
                setActiveScreen("plan");
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer ${
                !showAllThree && activeScreen === "plan"
                  ? "bg-[#84CC16] text-black"
                  : "bg-[#1c1c1c] text-neutral-300"
              }`}
            >
              1. Plan
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAllThree(false);
                setActiveScreen("members");
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer ${
                !showAllThree && activeScreen === "members"
                  ? "bg-[#84CC16] text-black"
                  : "bg-[#1c1c1c] text-neutral-300"
              }`}
            >
              2. Members
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAllThree(false);
                setActiveScreen("add-member");
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer ${
                !showAllThree && activeScreen === "add-member"
                  ? "bg-[#84CC16] text-black"
                  : "bg-[#1c1c1c] text-neutral-300"
              }`}
            >
              3. Add Member
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowAllThree((prev) => !prev)}
            className="px-3 py-1.5 rounded-lg bg-[#222222] hover:bg-[#2c2c2c] text-[#84CC16] font-semibold border border-[#84CC16]/40 cursor-pointer"
          >
            {showAllThree ? "Ver pantalla por pantalla" : "Ver las 3 pantallas juntas"}
          </button>
        </div>

        {/* Pantallas */}
        {showAllThree ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {planScreenView}
            {membersScreenView}
            {addMemberScreenView}
          </div>
        ) : (
          <div>
            {activeScreen === "plan" && planScreenView}
            {activeScreen === "members" && membersScreenView}
            {activeScreen === "add-member" && addMemberScreenView}
          </div>
        )}
      </div>
    </main>
  );
}