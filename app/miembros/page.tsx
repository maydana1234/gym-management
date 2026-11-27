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

  const activeColor = "#84cc16";
  const inactiveColor = "#f4f4f5";

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#090d06",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px",
        boxSizing: "border-box",
      }}
    >
      <main
        className="app-shell"
        style={{
          width: "100%",
          maxWidth: "390px",
          height: "780px",
          maxHeight: "92vh",
          borderRadius: "28px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 18px 45px rgba(0,0,0,0.75)",
          backgroundColor: "#000000",
        }}
      >
        <section
          className="members-screen"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            paddingBottom: 0,
          }}
        >
          <div
            style={{
              backgroundColor: "#84cc16",
              padding: "12px",
            }}
          >
            <div className="search-bar" style={{ margin: 0 }}>
              <input
                placeholder="Buscar por nombre o ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
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

          <div className="members-content" style={{ flex: 1 }}>
            <div
              className="members-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "12px",
              }}
            >
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

          <div
            style={{
              position: "sticky",
              bottom: "-1px",
              left: 0,
              width: "100%",
              zIndex: 25,
              marginTop: "auto",
            }}
          >
            <button
              type="button"
              onClick={() => router.push("/miembros/nuevo")}
              aria-label="Agregar miembro"
              style={{
                position: "absolute",
                right: "14px",
                bottom: "68px",
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                color: "#ffffff",
                border: "2px solid #ffffff",
                fontSize: "30px",
                lineHeight: "1",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(0,0,0,0.55)",
                zIndex: 30,
              }}
            >
              +
            </button>

            <div
              role="navigation"
              aria-label="Barra inferior"
              style={{
                width: "100%",
                boxSizing: "border-box",
                backgroundColor: "#222222",
                borderTop: "1px solid #333333",
                borderRadius: "14px 14px 14px 14px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 2px 12px 2px",
              }}
            >
              <button
                type="button"
                onClick={() => router.push("/miembros")}
                style={{
                  flex: "1 1 0%",
                  minWidth: 0,
                  background: "transparent",
                  border: "none",
                  color: activeColor,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                  fontSize: "9.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: "2px 0",
                }}
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill={activeColor}>
                  <circle cx="8" cy="7" r="2.5" />
                  <path d="M4 17v-1.5C4 13.5 6 12.5 8 12.5s4 1 4 3V17H4z" />
                  <circle cx="16" cy="7" r="2.5" />
                  <path d="M12 17v-1.5c0-2 2-3 4-3s4 1 4 3V17h-8z" />
                </svg>
                <span>Members</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/")}
                style={{
                  flex: "1 1 0%",
                  minWidth: 0,
                  background: "transparent",
                  border: "none",
                  color: inactiveColor,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                  fontSize: "9.5px",
                  cursor: "pointer",
                  padding: "2px 0",
                }}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={inactiveColor}
                  strokeWidth="1.8"
                >
                  <path d="M5 19V14M10 19V11M15 19V8M20 19V5" />
                  <circle cx="5" cy="11" r="1.5" fill={inactiveColor} />
                  <circle cx="10" cy="8" r="1.5" fill={inactiveColor} />
                  <circle cx="15" cy="6" r="1.5" fill={inactiveColor} />
                  <circle cx="20" cy="4" r="1.5" fill={inactiveColor} />
                </svg>
                <span>Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/miembros/nuevo")}
                style={{
                  flex: "1 1 0%",
                  minWidth: 0,
                  background: "transparent",
                  border: "none",
                  color: inactiveColor,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                  fontSize: "9.5px",
                  cursor: "pointer",
                  padding: "2px 0",
                }}
              >
                <svg
                  width="21"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={inactiveColor}
                  strokeWidth="1.8"
                >
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <circle cx="12" cy="12" r="2.8" />
                </svg>
                <span>Collection</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/")}
                style={{
                  flex: "1 1 0%",
                  minWidth: 0,
                  background: "transparent",
                  border: "none",
                  color: inactiveColor,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                  fontSize: "9.5px",
                  cursor: "pointer",
                  padding: "2px 0",
                }}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={inactiveColor}
                  strokeWidth="1.8"
                >
                  <path d="M4 20V5h10v15M14 11h6v9" />
                  <path d="M8 9h2M8 13h2M17 15h1" />
                </svg>
                <span>Gym</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/miembros")}
                style={{
                  flex: "1 1 0%",
                  minWidth: 0,
                  background: "transparent",
                  border: "none",
                  color: inactiveColor,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                  fontSize: "9.5px",
                  cursor: "pointer",
                  padding: "2px 0",
                }}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={inactiveColor}
                  strokeWidth="1.8"
                >
                  <path d="M8 4h7l4 4v11H8z" />
                  <path d="M5 7v13h11" />
                </svg>
                <span>Report</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}