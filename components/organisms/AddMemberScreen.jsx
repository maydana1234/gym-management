"use client";
import { useState } from "react";

export default function AddMemberScreen({
  selectedPlan,
  onBackToMembers,
  onMemberSaved,
}) {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("Masculino");
  const [memberNo, setMemberNo] = useState("12");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [training, setTraining] = useState("Entrenador");
  const [plan, setPlan] = useState(selectedPlan?.name || "DORADO");
  const [batchTime, setBatchTime] = useState("6.00am to 7.00am");
  const [joiningDate, setJoiningDate] = useState("1/9/23");
  const [expiryDate, setExpiryDate] = useState("1/10/23");
  const [paidAmount, setPaidAmount] = useState("");
  const [dueAmount, setDueAmount] = useState("0");
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Ingresa el nombre completo");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_MEMBERS_API_URL;
    if (!apiUrl) {
      setErrorMsg("Falta NEXT_PUBLIC_MEMBERS_API_URL en .env.local");
      return;
    }

    const fallbackAvatar = `https://i.pravatar.cc/150?u=${encodeURIComponent(
      `${name.trim()}-${memberNo || Date.now()}`
    )}`;

    const payload = {
      name: name.trim(),
      avatar: photoUrl.trim() || fallbackAvatar,
      mobile: mobile.trim(),
      gender,
      memberNo: memberNo.trim() || String(Date.now()),
      measurements: {
        height: height.trim(),
        weight: weight.trim(),
        chest: chest.trim(),
        waist: waist.trim(),
      },
      dob: dob.trim(),
      address: address.trim(),
      training,
      plan,
      batchTime,
      joiningDate: joiningDate.trim(),
      expiryDate: expiryDate.trim() || "01 Sep 2026",
      paidAmount: Number(paidAmount) || 0,
      dueAmount: Number(dueAmount) || 0,
      paymentMethod,
    };

    try {
      setSaving(true);
      const res = await fetch(`${apiUrl}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("No se pudo guardar en MockAPI");
      }

      setSaving(false);
      if (onMemberSaved) {
        onMemberSaved();
      } else if (onBackToMembers) {
        onBackToMembers();
      }
    } catch (err) {
      setSaving(false);
      setErrorMsg(err.message || "Error al guardar");
    }
  }

  return (
    <div className="relative flex flex-col h-full bg-[#090909] text-white overflow-hidden">
      <header className="bg-[#84CC16] text-black px-4 py-2.5 flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={onBackToMembers}
          title="Volver"
          className="text-xl font-extrabold px-1 hover:bg-black/10 rounded cursor-pointer"
        >
          &lt;
        </button>
        <h1 className="text-sm font-extrabold">Agregar miembro</h1>
        <span className="w-5" />
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-xs pb-10"
      >
        {errorMsg && (
          <div className="px-2.5 py-1.5 rounded bg-red-950/80 border border-red-500 text-red-200 text-[11px]">
            {errorMsg}
          </div>
        )}

        <div className="flex items-center gap-3">
          <label className="w-28 text-[#84CC16] font-bold shrink-0">
            Nombre -:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre completo"
            className="flex-1 bg-transparent border-b border-neutral-700 text-white py-1 focus:outline-none focus:border-[#84CC16]"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-[#84CC16] font-bold shrink-0">
            Subir foto -:
          </label>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="URL de la foto (opcional)"
            className="flex-1 bg-[#141414] border border-neutral-800 rounded px-2.5 py-1.5 text-white text-[11px] focus:outline-none focus:border-[#84CC16]"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-[#84CC16] font-bold shrink-0">
            Número de móvil -:
          </label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Número de teléfono"
            className="flex-1 bg-transparent border-b border-neutral-700 text-white py-1 focus:outline-none focus:border-[#84CC16]"
          />
        </div>

        <div className="flex items-center gap-4 py-0.5">
          <span className="w-28 text-[#84CC16] font-bold shrink-0">
            Género -:
          </span>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="Masculino"
              checked={gender === "Masculino"}
              onChange={(e) => setGender(e.target.value)}
              className="accent-blue-500"
            />
            <span className="text-white font-semibold">Masculino</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="Mujer"
              checked={gender === "Mujer"}
              onChange={(e) => setGender(e.target.value)}
              className="accent-blue-500"
            />
            <span className="text-white font-semibold">Mujer</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-[#84CC16] font-bold shrink-0">
            Número de miembro:
          </label>
          <input
            type="text"
            value={memberNo}
            onChange={(e) => setMemberNo(e.target.value)}
            className="flex-1 bg-transparent border-b border-neutral-700 text-[#84CC16] font-bold py-1 focus:outline-none focus:border-[#84CC16]"
          />
        </div>

        <div className="space-y-2">
          <div className="text-[#84CC16] font-bold">Medición -:</div>
          <div className="pl-2 grid grid-cols-2 gap-3 text-[11px]">
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Altura"
              className="bg-transparent border-b border-neutral-700 text-white py-1 focus:outline-none focus:border-[#84CC16]"
            />
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Peso"
              className="bg-transparent border-b border-neutral-700 text-white py-1 focus:outline-none focus:border-[#84CC16]"
            />
            <input
              type="text"
              value={chest}
              onChange={(e) => setChest(e.target.value)}
              placeholder="Cofre"
              className="bg-transparent border-b border-neutral-700 text-white py-1 focus:outline-none focus:border-[#84CC16]"
            />
            <input
              type="text"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              placeholder="Cintura"
              className="bg-transparent border-b border-neutral-700 text-white py-1 focus:outline-none focus:border-[#84CC16]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-[#84CC16] font-bold shrink-0">
            Fecha de nacimiento -:
          </label>
          <input
            type="text"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="DD/MM/AAAA"
            className="flex-1 bg-transparent border-b border-neutral-700 text-white py-1 focus:outline-none focus:border-[#84CC16]"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-[#84CC16] font-bold shrink-0">
            Dirección -:
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Dirección"
            className="flex-1 bg-transparent border-b border-neutral-700 text-white py-1 focus:outline-none focus:border-[#84CC16]"
          />
        </div>

        <div className="flex items-center gap-4 py-0.5">
          <span className="w-28 text-[#84CC16] font-bold shrink-0">
            Entrenamiento -:
          </span>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="training"
              value="Entrenador"
              checked={training === "Entrenador"}
              onChange={(e) => setTraining(e.target.value)}
              className="accent-blue-500"
            />
            <span className="text-white font-semibold">Entrenador</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="training"
              value="Personal"
              checked={training === "Personal"}
              onChange={(e) => setTraining(e.target.value)}
              className="accent-blue-500"
            />
            <span className="text-white font-semibold">Personal</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-[#84CC16] font-bold shrink-0">
            Plan -:
          </label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="flex-1 bg-[#141414] border border-neutral-700 rounded px-2.5 py-1.5 text-[#84CC16] font-bold focus:outline-none"
          >
            <option value="DORADO">DORADO</option>
            <option value="ESTÁNDAR">ESTÁNDAR</option>
            <option value="PREMIUM">PREMIUM</option>
            <option value="General [ 800 ]">General [ 800 ]</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-[#84CC16] font-bold shrink-0 leading-tight">
            Tiempo de procesamiento por lotes:
          </label>
          <input
            type="text"
            value={batchTime}
            onChange={(e) => setBatchTime(e.target.value)}
            className="flex-1 bg-transparent border-b border-neutral-700 text-white py-1 focus:outline-none focus:border-[#84CC16]"
          />
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="w-28 text-[#84CC16] font-bold shrink-0">
            Fecha de ingreso:
          </span>
          <input
            type="text"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
            className="w-16 bg-transparent border-b border-neutral-700 text-white py-1 focus:outline-none"
          />
          <span className="text-neutral-300 font-semibold">To</span>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-16 bg-transparent border-b border-neutral-700 text-white py-1 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-[#84CC16] font-bold shrink-0">
            Importe pagado -:
          </label>
          <input
            type="number"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            placeholder="0"
            className="flex-1 bg-transparent border-b border-neutral-700 text-white py-1 focus:outline-none focus:border-[#84CC16]"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-[#84CC16] font-bold shrink-0">
            Importe a pagar -:
          </label>
          <input
            type="number"
            value={dueAmount}
            onChange={(e) => setDueAmount(e.target.value)}
            placeholder="0"
            className="flex-1 bg-transparent border-b border-neutral-700 text-white py-1 focus:outline-none focus:border-[#84CC16]"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-[#84CC16] font-bold shrink-0">
            Método de pago -:
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="flex-1 bg-[#141414] border border-neutral-700 rounded px-2.5 py-1.5 text-white font-semibold focus:outline-none"
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Transferencia">Transferencia</option>
            <option value="QR">QR</option>
          </select>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-2 rounded-full bg-[#141414] hover:bg-[#1e1e1e] text-[#84CC16] font-bold text-xs border border-[#84CC16] cursor-pointer disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}