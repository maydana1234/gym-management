"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MemberForm from "../../../../components/organisms/MemberForm";

export default function EditarMiembroForm() {
  const router = useRouter();
  const [id, setId] = useState<string>("");
  const [member, setMember] = useState<any>(null);

  useEffect(() => {
    const parts = window.location.pathname.split("/");
    const idx = parts.indexOf("miembros");
    const memberId = idx >= 0 && parts[idx + 1] ? parts[idx + 1] : "";
    if (!memberId) return;
    setId(memberId);

    fetch(`https://6b0045397fc363ccff09fc19.mockapi.io/members/${memberId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setMember(data))
      .catch(() => {});
  }, []);

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
    <>
      <div style={{ background: "#84cc16", color: "#000", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", fontWeight: 700 }}>
        <button type="button" onClick={() => router.back()} style={{ background: "none", border: "none", color: "#000", fontSize: 20, fontWeight: 800, cursor: "pointer" }}>←</button>
        <span>Editar Miembro</span>
        <span style={{ width: 20 }} />
      </div>
      <div className="members-content">
        {member ? <MemberForm initialData={member} onSubmit={handleUpdate} /> : <p>Cargando...</p>}
      </div>
    </>
  );
}