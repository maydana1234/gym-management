"use client";
import { useEffect, useState } from "react";
import GymLogo from "../atoms/GymLogo";

function getMemberAvatar(member, index) {
  if (member.avatar && member.avatar.startsWith("http")) return member.avatar;
  if (member.photo && member.photo.startsWith("http")) return member.photo;
  const seed = encodeURIComponent(
    String(member.id || member.name || member.fullName || index)
  );
  return `https://i.pravatar.cc/150?u=${seed}`;
}

export default function MembersScreen({
  selectedPlan,
  onOpenAddMember,
  onBackToPlans,
  refreshTrigger,
}) {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_MEMBERS_API_URL}/members`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudieron cargar los miembros");
        return res.json();
      })
      .then((data) => {
        setMembers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [refreshTrigger]);

  function handleDeleteLocal(id) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setNotice("Miembro quitado de la vista actual");
    setTimeout(() => setNotice(""), 2500);
  }

  function triggerAction(label, memberName) {
    setNotice(`${label}: ${memberName || "Member"}`);
    setTimeout(() => setNotice(""), 2200);
  }

  const filteredMembers = members.filter((m) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    const name = String(m.name || m.fullName || "").toLowerCase();
    const mobile = String(m.mobile || m.phone || "").toLowerCase();
    return name.includes(q) || mobile.includes(q);
  });

  return (
    <div className="relative flex flex-col h-full bg-[#090909] text-white overflow-hidden">
      {/* Encabezado verde lima con menú y logo */}
      <header className="bg-[#84CC16] text-black px-3 py-2 flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={onBackToPlans}
          title="Back to Plans"
          className="text-lg font-bold px-1.5 py-0.5 rounded hover:bg-black/10 cursor-pointer"
        >
          ☰
        </button>
        <GymLogo size={36} />
        <span className="text-[10px] font-extrabold bg-black/15 px-2 py-0.5 rounded">
          {selectedPlan ? selectedPlan.name : "PLAN"}
        </span>
      </header>

      {/* Buscador + SMS */}
      <div className="px-2.5 py-2 bg-[#84CC16] flex items-center gap-2 shrink-0">
        <div className="flex-1 flex items-center bg-[#121212] rounded-lg px-2.5 py-1.5 border border-black/30">
          <span className="text-xs mr-1.5">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name/ Mobile"
            className="w-full bg-transparent text-white placeholder-neutral-400 text-xs focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => triggerAction("SMS Broadcast", "Selected Members")}
          className="bg-[#141414] text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-[#84CC16] cursor-pointer"
        >
          SMS
        </button>
      </div>

      {/* Filtros */}
      <div className="px-2 py-1.5 flex items-center justify-between gap-1 text-[10px] bg-[#0b0b0b] shrink-0">
        <span className="px-2 py-1 rounded-md border border-[#84CC16] text-white font-semibold truncate">
          All Member ▾
        </span>
        <span className="px-2 py-1 rounded-md border border-[#84CC16]/70 text-neutral-200 truncate">
          All Plans ▾
        </span>
        <span className="px-2 py-1 rounded-md border border-[#84CC16]/70 text-neutral-200 truncate">
          Select Batch ▾
        </span>
      </div>

      {notice && (
        <div className="mx-2 mt-1 px-2 py-1 rounded bg-[#1b2410] border border-[#84CC16] text-[10px] text-[#84CC16] text-center shrink-0">
          {notice}
        </div>
      )}

      {/* Cuadrícula de miembros */}
      <div className="flex-1 p-2 overflow-y-auto">
        {loading && (
          <p className="text-xs text-neutral-400 text-center py-8">
            Cargando miembros...
          </p>
        )}
        {error && (
          <p className="text-xs text-red-400 text-center py-8">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-2 gap-2">
            {filteredMembers.map((member, index) => {
              const memberName = member.name || member.fullName || "Member";
              return (
                <div
                  key={member.id || index}
                  className="relative rounded-xl bg-[#101010] border border-[#84CC16]/80 p-2 flex flex-col justify-between"
                >
                  {/* Botón eliminar arriba a la derecha */}
                  <button
                    type="button"
                    onClick={() => handleDeleteLocal(member.id)}
                    title="Delete"
                    className="absolute top-1.5 right-1.5 text-[11px] text-neutral-300 hover:text-red-400 cursor-pointer"
                  >
                    🗑
                  </button>

                  {/* Avatar circular distinto por usuario */}
                  <div className="flex justify-center mt-0.5">
                    <img
                      src={getMemberAvatar(member, index)}
                      alt={memberName}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(
                          memberName + index
                        )}`;
                      }}
                      className="w-11 h-11 rounded-full object-cover border border-[#84CC16]"
                    />
                  </div>

                  {/* Datos del miembro */}
                  <div className="mt-1.5 space-y-0.5 text-[10px] leading-tight">
                    <p className="truncate">
                      <span className="text-[#84CC16] font-semibold">Name : </span>
                      <span className="text-white font-semibold">{memberName}</span>
                    </p>
                    <p className="truncate">
                      <span className="text-neutral-300">🪪 M ID : </span>
                      <span className="text-white">{member.id}</span>
                    </p>
                    <p className="truncate">
                      <span className="text-[#84CC16]">Plan Expiry : </span>
                      <span className="text-neutral-200">
                        {member.expiryDate || "01 Sep 2026"}
                      </span>
                    </p>
                    <p className="truncate">
                      <span className="text-[#84CC16]">Due Amount : </span>
                      <span className="text-white">{member.dueAmount ?? 0}</span>
                    </p>
                  </div>

                  {/* Fila de acciones inferiores de la tarjeta */}
                  <div className="mt-2 pt-1 border-t border-neutral-800 grid grid-cols-5 gap-0.5 text-center text-[8px] text-neutral-300">
                    <button
                      type="button"
                      onClick={() => triggerAction("Call", memberName)}
                      className="flex flex-col items-center hover:text-[#84CC16] cursor-pointer"
                    >
                      <span className="text-[11px]">📞</span>
                      <span>Call</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerAction("Whatsapp", memberName)}
                      className="flex flex-col items-center hover:text-[#84CC16] cursor-pointer"
                    >
                      <span className="text-[11px]">💬</span>
                      <span>Whatsapp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerAction("Renew Plan", memberName)}
                      className="flex flex-col items-center hover:text-[#84CC16] cursor-pointer"
                    >
                      <span className="text-[11px]">↻</span>
                      <span>Renew</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerAction("Message", memberName)}
                      className="flex flex-col items-center hover:text-[#84CC16] cursor-pointer"
                    >
                      <span className="text-[11px]">✉</span>
                      <span>Message</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerAction("Block", memberName)}
                      className="flex flex-col items-center hover:text-red-400 cursor-pointer"
                    >
                      <span className="text-[11px]">🚫</span>
                      <span>Block</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Botón rojo + */}
      <button
        type="button"
        onClick={onOpenAddMember}
        title="Add Member"
        className="absolute bottom-12 right-3.5 w-11 h-11 rounded-full bg-red-600 hover:bg-red-500 text-white text-2xl font-bold shadow-lg flex items-center justify-center cursor-pointer z-10"
      >
        +
      </button>

      {/* Barra de navegación inferior con iconos */}
      <nav className="bg-[#151515] border-t border-neutral-800 py-1.5 px-1 grid grid-cols-5 text-[9px] text-center shrink-0">
        <div className="flex flex-col items-center text-[#84CC16] font-semibold">
          <span className="text-sm leading-none">👥</span>
          <span className="mt-0.5">Members</span>
        </div>
        <div className="flex flex-col items-center text-neutral-300">
          <span className="text-sm leading-none">📈</span>
          <span className="mt-0.5">Dashboard</span>
        </div>
        <div className="flex flex-col items-center text-neutral-300">
          <span className="text-sm leading-none">💵</span>
          <span className="mt-0.5">Collection</span>
        </div>
        <div className="flex flex-col items-center text-neutral-300">
          <span className="text-sm leading-none">🏋️</span>
          <span className="mt-0.5">Gym</span>
        </div>
        <div className="flex flex-col items-center text-neutral-300">
          <span className="text-sm leading-none">📋</span>
          <span className="mt-0.5">Today Report</span>
        </div>
      </nav>
    </div>
  );
}