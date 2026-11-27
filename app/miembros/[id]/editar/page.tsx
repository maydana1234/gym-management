"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MemberForm from "../../../../components/organisms/MemberForm";
import "../../../../components/organisms/members.css";

export default function EditarMiembroPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [member, setMember] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://6b0045397fc363ccff09fc19.mockapi.io/members/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setMember(data))
      .catch(() => {});
  }, [id]);

  function handleUpdate(data: any) {
    return fetch(`https://6b0045397fc363ccff09fc19.mockapi.io/members/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        router.push("/miembros");
      })
      .catch(() => alert("Error al actualizar."));
  }

  return (
    <main className="app-shell">
      <section className="members-screen">
        <div style={{ background: "#84cc16", color: "#000", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", fontWeight: 700 }}>
          <button type="button" onClick={() => router.back()} style={{ background: "none", border: "none", color: "#000", fontSize: 20, fontWeight: 800, cursor: "pointer" }}>←</button>
          <span>Editar Miembro</span>
          <span style={{ width: 20 }} />
        </div>
        <div className="members-content">
          {member ? <MemberForm initialData={member} onSubmit={handleUpdate} /> : <p>Cargando...</p>}
        </div>
      </section>
    </main>
  );
}