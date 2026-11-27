"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

interface Props {
  initialData?: any;
  onSubmit: (data: any) => Promise<void> | void;
}

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
const INITIAL = {
  name: "", avatar: "", mobile: "", gender: "Masculino", memberNo: "1",
  height: "", weight: "", chest: "", waist: "", dob: "", address: "",
  training: "Entrenador", plan: "General [ 800 ]", batchTime: "6.00am a 7.00am",
  joiningDate: "", planExpiry: "", paidAmount: "", dueAmount: "0", paymentMethod: "Efectivo",
};

export default function MemberForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState(INITIAL);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) setForm({ ...INITIAL, ...initialData, memberNo: String(initialData.memberNo ?? initialData.id ?? "1"), dueAmount: String(initialData.dueAmount ?? "0"), paidAmount: String(initialData.paidAmount ?? "") });
  }, [initialData]);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  function handlePhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = c.height = 150;
        c.getContext("2d")?.drawImage(img, 0, 0, 150, 150);
        set("avatar", c.toDataURL("image/jpeg", 0.75));
      };
      if (typeof reader.result === "string") img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return alert("Ingresa el nombre.");
    setSaving(true);
    try {
      await onSubmit({ ...form, name: form.name.trim(), avatar: form.avatar || DEFAULT_AVATAR, paidAmount: Number(form.paidAmount || 0), dueAmount: Number(form.dueAmount || 0) });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="member-form">
      <div className="form-row"><label>Nombre -:</label><input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} required /></div>
      <div className="form-row">
        <label>Foto de Perfil -:</label>
        <div className="photo-box">
          {form.avatar && <img src={form.avatar} alt="Perfil" className="photo-preview" />}
          <label className="upload-btn">↑ Subir Foto<input type="file" accept="image/*" onChange={handlePhoto} hidden /></label>
        </div>
      </div>
      <div className="form-row"><label>Celular -:</label><input type="tel" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} /></div>
      <div className="form-row">
        <label>Género -:</label>
        <div className="radio-group">
          {["Masculino", "Femenino"].map((g) => (
            <label key={g}><input type="radio" name="gender" checked={form.gender === g} onChange={() => set("gender", g)} /> {g}</label>
          ))}
        </div>
      </div>
      <div className="form-row"><label>N° Miembro -:</label><input type="text" value={form.memberNo} onChange={(e) => set("memberNo", e.target.value)} /></div>
      <div className="form-row">
        <label>Medidas -:</label>
        <div className="measures-grid">
          <input type="text" placeholder="Altura" value={form.height} onChange={(e) => set("height", e.target.value)} />
          <input type="text" placeholder="Peso" value={form.weight} onChange={(e) => set("weight", e.target.value)} />
          <input type="text" placeholder="Pecho" value={form.chest} onChange={(e) => set("chest", e.target.value)} />
          <input type="text" placeholder="Cintura" value={form.waist} onChange={(e) => set("waist", e.target.value)} />
        </div>
      </div>
      <div className="form-row"><label>Fecha Nac. -:</label><input type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} /></div>
      <div className="form-row"><label>Dirección -:</label><input type="text" value={form.address} onChange={(e) => set("address", e.target.value)} /></div>
      <div className="form-row">
        <label>Entrenamiento -:</label>
        <div className="radio-group">
          {["Entrenador", "Personal"].map((t) => (
            <label key={t}><input type="radio" name="training" checked={form.training === t} onChange={() => set("training", t)} /> {t}</label>
          ))}
        </div>
      </div>
      <div className="form-row">
        <label>Plan -:</label>
        <select value={form.plan} onChange={(e) => set("plan", e.target.value)}>
          <option>General [ 800 ]</option><option>Standard [ 40$ ]</option><option>Premium [ 50$ ]</option><option>Golden [ 60$ ]</option>
        </select>
      </div>
      <div className="form-row">
        <label>Horario -:</label>
        <select value={form.batchTime} onChange={(e) => set("batchTime", e.target.value)}>
          <option>6.00am a 7.00am</option><option>7.00am a 8.00am</option><option>6.00pm a 7.00pm</option><option>7.00pm a 8.00pm</option>
        </select>
      </div>
      <div className="form-row">
        <label>Ingreso -:</label>
        <div className="date-range">
          <input type="text" placeholder="01/12/26" value={form.joiningDate} onChange={(e) => set("joiningDate", e.target.value)} />
          <span>Al</span>
          <input type="text" placeholder="01/01/27" value={form.planExpiry} onChange={(e) => set("planExpiry", e.target.value)} />
        </div>
      </div>
      <div className="form-row"><label>Monto Pagado -:</label><input type="number" value={form.paidAmount} onChange={(e) => set("paidAmount", e.target.value)} /></div>
      <div className="form-row"><label>Saldo Pendiente -:</label><input type="number" value={form.dueAmount} onChange={(e) => set("dueAmount", e.target.value)} /></div>
      <div className="form-row">
        <label>Método Pago -:</label>
        <select value={form.paymentMethod} onChange={(e) => set("paymentMethod", e.target.value)}>
          <option>Efectivo</option><option>QR / Transferencia</option><option>Tarjeta</option>
        </select>
      </div>
      <button type="submit" disabled={saving} className="save-btn">{saving ? "Guardando..." : "Guardar"}</button>
    </form>
  );
}