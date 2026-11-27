"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../../components/organisms/members.css";

export default function MembersPage() {
  const router = useRouter();
  const [members, setMembers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  function loadMembers() {
    fetch("https://6b0045397fc363ccff09fc19.mockapi.io/members")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setMembers(Array.isArray(data) ? data : []))
      .catch(() => setMembers([]));
  }

  useEffect(() => {
    loadMembers();
  }, []);

  function handleDelete(id: string) {
    fetch(`https://6b0045397fc363ccff09fc19.mockapi.io/members/${id}`, {
      method: "DELETE",
    })
      .then(() => loadMembers())
      .catch(() => alert("No se pudo eliminar."));
  }

  const filtered = members.filter((m) => {
    const name = String(m.name || m.nombre || "").toLowerCase();
    const okSearch =
      !search.trim() ||
      name.includes(search.toLowerCase()) ||
      String(m.id).includes(search);
    const okPlan = !planFilter || String(m.plan || "").includes(planFilter);
    const okGender = !genderFilter || String(m.gender || "") === genderFilter;
    const due = Number(m.dueAmount ?? m.saldo ?? 0);
    const okStatus =
      !statusFilter || (statusFilter === "Active" ? due <= 0 : due > 0);
    return okSearch && okPlan && okGender && okStatus;
  });

  return (
    <main className="app-shell">
      <section className="members-screen" style={{ position: "relative" }}>
        <div className="search-bar">
          <input
            placeholder="Buscar por nombre o ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="member-filters">
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Plan</option>
            <option value="General">General</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
            <option value="Golden">Golden</option>
          </select>

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Estado</option>
            <option value="Active">Al día</option>
            <option value="Due">Pendiente</option>
          </select>
        </div>

        <div className="members-content">
          <div className="members-grid">
            {filtered.map((m) => (
              <div key={m.id} className="member-card">
                <img
                  src={
                    m.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt={m.name || "Miembro"}
                  className="photo-preview"
                />
                <strong>{m.name || m.nombre || "Sin nombre"}</strong>
                <span>{m.plan || "General"}</span>
                <div className="photo-box">
                  <button
                    type="button"
                    onClick={() => router.push(`/miembros/${m.id}/editar`)}
                    className="upload-btn"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(m.id)}
                    className="upload-btn"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push("/miembros/nuevo")}
          aria-label="Agregar miembro"
          style={{
            position: "fixed",
            right: 22,
            bottom: 22,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            fontSize: 32,
            lineHeight: 1,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
            zIndex: 30,
          }}
        >
          +
        </button>
      </section>
    </main>
  );
}