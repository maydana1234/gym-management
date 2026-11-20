"use client";
import { useEffect, useState } from "react";
import GymLogo from "../atoms/GymLogo";

function getMemberAvatar(member, index) {
  if (member?.avatar && String(member.avatar).trim() !== "") {
    return member.avatar;
  }
  const seed = encodeURIComponent(
    `${member?.name || member?.fullName || "miembro"}-${member?.id || index + 1}`
  );
  return `https://i.pravatar.cc/150?u=${seed}`;
}

export default function MembersScreen({
  selectedPlan,
  refreshTrigger = 0,
  onOpenAddMember,
  onBackToPlans,
}) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState("");
  const [memberFilter, setMemberFilter] = useState("Todos los miembros");
  const [planFilter, setPlanFilter] = useState("Todos los planes");
  const [batchFilter, setBatchFilter] = useState("Seleccionar lote");
  const [activeTab, setActiveTab] = useState("Miembros");
  const [statusNote, setStatusNote] = useState("");

  useEffect(() => {
    let active = true;

    async function loadMembers() {
      const apiUrl = process.env.NEXT_PUBLIC_MEMBERS_API_URL;
      if (!apiUrl) {
        if (active) {
          setErrorMsg("Falta NEXT_PUBLIC_MEMBERS_API_URL en .env.local");
          setLoading(false);
        }
        return;
      }

      try {
        if (active) {
          setLoading(true);
          setErrorMsg("");
        }
        const res = await fetch(`${apiUrl}/members`, { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Error al cargar miembros desde MockAPI");
        }
        const data = await res.json();
        if (active) {
          setMembers(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          setErrorMsg(err.message || "No se pudieron cargar los miembros");
          setLoading(false);
        }
      }
    }

    loadMembers();
    return () => {
      active = false;
    };
  }, [refreshTrigger]);

  async function handleDeleteMember(id) {
    const apiUrl = process.env.NEXT_PUBLIC_MEMBERS_API_URL;
    if (!apiUrl || !id) return;
    try {
      const res = await fetch(`${apiUrl}/members/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
      }
    } catch {
      setStatusNote("No se pudo eliminar el miembro");
    }
  }

  const filteredMembers = members.filter((m) => {
    const name = String(m.name || m.fullName || "").toLowerCase();
    const mobile = String(m.mobile || m.phone || "").toLowerCase();
    const q = search.trim().toLowerCase();
    const matchesQuery = !q || name.includes(q) || mobile.includes(q);

    const due = Number(m.dueAmount ?? 0);
    const matchesMemberType =
      memberFilter === "Todos los miembros" ||
      (memberFilter === "Pendientes" && due > 0) ||
      (memberFilter === "Al día" && due === 0);

    const planText = String(m.plan || "").toLowerCase();
    const matchesPlan =
      planFilter === "Todos los planes" ||
      planText.includes(planFilter.toLowerCase());

    const batchText = String(m.batchTime || "").toLowerCase();
    const matchesBatch =
      batchFilter === "Seleccionar lote" ||
      batchText.includes(batchFilter.toLowerCase());

    return matchesQuery && matchesMemberType && matchesPlan && matchesBatch;
  });

  return (
    <div className="relative flex flex-col h-full bg-[#090909] text-white overflow-hidden">
      <header className="bg-[#84CC16] text-black px-3 pt-2 pb-2.5 shrink-0 space-y-2">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToPlans}
            title="Planes"
            className="text-lg font-bold px-1.5 py-0.5 rounded hover:bg-black/10 cursor-pointer"
          >
            ☰
          </button>
          <GymLogo size={32} />
          <span className="bg-[#1c1c1c] text-[#84CC16] text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase">
            {selectedPlan?.name || "DORADO"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center bg-[#1c1c1c] text-white rounded-full px-3 py-1.5 text-xs">
            <span className="mr-1.5 text-neutral-400">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nombre/ Móvil"
              className="w-full bg-transparent text-white placeholder:text-neutral-400 focus:outline-none text-xs"
            />
          </div>
          <button
            type="button"
            onClick={() => setStatusNote("SMS listo para enviar")}
            className="bg-[#1c1c1c] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full hover:bg-black cursor-pointer shrink-0"
          >
            SMS
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold">
          <select
            value={memberFilter}
            onChange={(e) => setMemberFilter(e.target.value)}
            className="bg-[#141414] text-white border border-neutral-700 rounded-md px-2 py-1 focus:outline-none truncate"
          >
            <option value="Todos los miembros">Todos los miembr...</option>
            <option value="Pendientes">Pendientes</option>
            <option value="Al día">Al día</option>
          </select>

          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="bg-[#141414] text-white border border-neutral-700 rounded-md px-2 py-1 focus:outline-none truncate"
          >
            <option value="Todos los planes">Todos los plane...</option>
            <option value="ESTÁNDAR">ESTÁNDAR</option>
            <option value="PREMIUM">PREMIUM</option>
            <option value="DORADO">DORADO</option>
            <option value="General">General</option>
          </select>

          <select
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            className="bg-[#141414] text-white border border-neutral-700 rounded-md px-2 py-1 focus:outline-none truncate"
          >
            <option value="Seleccionar lote">Seleccionar lot...</option>
            <option value="6.00am">6.00am</option>
            <option value="7.00am">7.00am</option>
            <option value="5.00pm">5.00pm</option>
          </select>
        </div>
      </header>

      {statusNote && (
        <div className="bg-[#1a2408] text-[#84CC16] text-[11px] px-3 py-1 flex items-center justify-between">
          <span>{statusNote}</span>
          <button
            type="button"
            onClick={() => setStatusNote("")}
            className="text-xs font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-2.5 py-2.5 pb-16">
        {loading && (
          <p className="text-center text-xs text-neutral-400 py-8">
            Cargando miembros...
          </p>
        )}

        {errorMsg && (
          <p className="text-center text-xs text-red-400 py-6 px-2">
            {errorMsg}
          </p>
        )}

        {!loading && !errorMsg && filteredMembers.length === 0 && (
          <p className="text-center text-xs text-neutral-400 py-8">
            No hay miembros. Toca + para agregar uno.
          </p>
        )}

        <div className="grid grid-cols-2 gap-2.5">
          {filteredMembers.map((member, index) => {
            const avatarSrc = getMemberAvatar(member, index);
            const displayName =
              member.name || member.fullName || `nombre ${index + 1}`;
            const memberId = member.memberNo || member.id || index + 1;
            const expiry = member.expiryDate || "01 Sep 2026";
            const due = member.dueAmount ?? 0;

            return (
              <div
                key={member.id || `${displayName}-${index}`}
                className="relative rounded-2xl bg-[#0e0e0e] border border-[#84CC16]/85 p-2 flex flex-col justify-between"
              >
                <button
                  type="button"
                  onClick={() => handleDeleteMember(member.id)}
                  title="Eliminar"
                  className="absolute top-1.5 right-2 text-[11px] text-neutral-300 hover:text-red-400 cursor-pointer"
                >
                  🗑
                </button>

                <div className="flex justify-center mt-0.5">
                  <img
                    src={avatarSrc}
                    alt={displayName}
                    className="w-11 h-11 rounded-full object-cover border border-[#84CC16]/60 bg-neutral-800"
                  />
                </div>

                <div className="mt-1.5 space-y-0.5 text-[10px] leading-tight">
                  <div className="truncate">
                    <span className="text-[#84CC16] font-semibold">
                      Nombre:{" "}
                    </span>
                    <span className="text-white font-medium">{displayName}</span>
                  </div>
                  <div className="truncate flex items-center gap-1">
                    <span className="text-neutral-400">🪪</span>
                    <span className="text-[#84CC16] font-semibold">
                      ID M:{" "}
                    </span>
                    <span className="text-white">{memberId}</span>
                  </div>
                  <div className="truncate">
                    <span className="text-[#84CC16] font-semibold">
                      Fecha de vencimiento del...{" "}
                    </span>
                    <span className="text-white">{expiry}</span>
                  </div>
                  <div className="truncate">
                    <span className="text-[#84CC16] font-semibold">
                      Importe a pagar:{" "}
                    </span>
                    <span className="text-white">{due}</span>
                  </div>
                </div>

                <div className="mt-2 pt-1.5 border-t border-neutral-800 grid grid-cols-5 gap-0.5 text-center text-[7.5px] text-neutral-300">
                  <button
                    type="button"
                    onClick={() => setStatusNote(`Llamando a ${displayName}`)}
                    className="flex flex-col items-center hover:text-[#84CC16] cursor-pointer truncate"
                  >
                    <span>📞</span>
                    <span className="truncate w-full">Llamar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusNote(`WhatsApp ${displayName}`)}
                    className="flex flex-col items-center hover:text-[#84CC16] cursor-pointer truncate"
                  >
                    <span>💬</span>
                    <span className="truncate w-full">WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusNote(`Renovar ${displayName}`)}
                    className="flex flex-col items-center hover:text-[#84CC16] cursor-pointer truncate"
                  >
                    <span>↻</span>
                    <span className="truncate w-full">Renovar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusNote(`Mensaje ${displayName}`)}
                    className="flex flex-col items-center hover:text-[#84CC16] cursor-pointer truncate"
                  >
                    <span>✉️</span>
                    <span className="truncate w-full">Mensaje</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusNote(`Bloquear ${displayName}`)}
                    className="flex flex-col items-center hover:text-red-400 cursor-pointer truncate"
                  >
                    <span>🚫</span>
                    <span className="truncate w-full">Bloquear</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenAddMember}
        title="Agregar miembro"
        className="absolute bottom-14 right-3.5 w-11 h-11 rounded-full bg-red-600 hover:bg-red-500 text-white text-2xl font-bold flex items-center justify-center shadow-lg cursor-pointer z-20"
      >
        +
      </button>

      <nav className="bg-[#181818] border-t border-neutral-800 px-1.5 py-1.5 grid grid-cols-5 gap-1 text-[8.5px] shrink-0 z-10">
        {[
          { id: "Miembros", icon: "👥", label: "Miembros" },
          { id: "Panel de control", icon: "📊", label: "Panel de control" },
          { id: "Colección", icon: "💵", label: "Colección" },
          { id: "Gimnasio", icon: "🏢", label: "Gimnasio" },
          { id: "Informe de hoy", icon: "📄", label: "Informe de hoy" },
        ].map((tab) => {
          const activeStyle =
            activeTab === tab.id ? "text-[#84CC16] font-bold" : "text-neutral-300";
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-0.5 cursor-pointer ${activeStyle}`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span className="truncate max-w-full">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}