"use client";
import { useState } from "react";

export default function AddMemberScreen({
  selectedPlan,
  onBackToMembers,
  onMemberCreated,
}) {
  const [form, setForm] = useState({
    name: "",
    avatar: "",
    mobile: "",
    gender: "Male",
    memberNo: "12",
    height: "",
    weight: "",
    chest: "",
    waist: "",
    birthDate: "",
    address: "",
    trainingType: "Trainer",
    planLabel: selectedPlan ? selectedPlan.name : "General [ 800 ]",
    batchTime: "6.00am to 7.00am",
    joiningDate: "1/9/23 To 1/10/23",
    paidAmount: "",
    dueAmount: "0",
    paymentMethod: "Cash",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: form.name.trim() || "New Member",
      avatar:
        form.avatar.trim() ||
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&q=80",
      mobile: form.mobile.trim(),
      gender: form.gender,
      memberNo: form.memberNo,
      height: form.height,
      weight: form.weight,
      chest: form.chest,
      waist: form.waist,
      birthDate: form.birthDate,
      address: form.address,
      trainingType: form.trainingType,
      plan: form.planLabel,
      batchTime: form.batchTime,
      joiningDate: form.joiningDate,
      paidAmount: Number(form.paidAmount) || 0,
      dueAmount: Number(form.dueAmount) || 0,
      paymentMethod: form.paymentMethod,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_MEMBERS_API_URL}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("No se pudo guardar el miembro en la API");
      }

      setSaving(false);
      if (onMemberCreated) onMemberCreated();
      onBackToMembers();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col min-h-[760px] bg-[#090909] text-white border border-neutral-800 rounded-2xl overflow-hidden">
      {/* Barra superior verde lima con flecha < */}
      <header className="bg-[#84CC16] text-black px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToMembers}
          className="text-xl font-extrabold leading-none px-1 cursor-pointer"
          title="Back"
        >
          &lt;
        </button>
        <span className="font-extrabold text-sm">Add Member</span>
        <span className="w-4" />
      </header>

      <form onSubmit={handleSubmit} className="flex-1 p-4 space-y-3 text-xs overflow-y-auto">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <label className="text-neutral-200 w-32">Name -:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            className="flex-1 bg-transparent border-b border-neutral-600 focus:border-[#84CC16] focus:outline-none py-1 text-white"
          />
        </div>

        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <label className="text-neutral-200 w-32">Upload Photo -:</label>
          <input
            type="text"
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
            placeholder="Photo URL (optional)"
            className="flex-1 bg-[#161616] border border-neutral-700 rounded px-2 py-1 text-white"
          />
        </div>

        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <label className="text-neutral-200 w-32">Mobile No. -:</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Phone number"
            className="flex-1 bg-transparent border-b border-neutral-600 focus:border-[#84CC16] focus:outline-none py-1 text-white"
          />
        </div>

        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <span className="text-neutral-200 w-32">Gender -:</span>
          <div className="flex-1 flex items-center gap-5">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={form.gender === "Male"}
                onChange={handleChange}
              />
              <span>Male</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={form.gender === "Female"}
                onChange={handleChange}
              />
              <span>Female</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <label className="text-neutral-200 w-32">Member No -:</label>
          <input
            type="text"
            name="memberNo"
            value={form.memberNo}
            onChange={handleChange}
            className="flex-1 bg-transparent text-[#84CC16] font-bold border-b border-neutral-600 focus:outline-none py-1"
          />
        </div>

        <div className="border-b border-neutral-800 pb-2 space-y-1.5">
          <p className="text-neutral-200">Measurement -:</p>
          <div className="grid grid-cols-2 gap-2 pl-4">
            <input
              type="text"
              name="height"
              value={form.height}
              onChange={handleChange}
              placeholder="Height"
              className="bg-transparent border-b border-neutral-700 py-0.5 text-white focus:outline-none"
            />
            <input
              type="text"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              placeholder="Weight"
              className="bg-transparent border-b border-neutral-700 py-0.5 text-white focus:outline-none"
            />
            <input
              type="text"
              name="chest"
              value={form.chest}
              onChange={handleChange}
              placeholder="Chest"
              className="bg-transparent border-b border-neutral-700 py-0.5 text-white focus:outline-none"
            />
            <input
              type="text"
              name="waist"
              value={form.waist}
              onChange={handleChange}
              placeholder="Waist"
              className="bg-transparent border-b border-neutral-700 py-0.5 text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <label className="text-neutral-200 w-32">Date of Birth -:</label>
          <input
            type="text"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            placeholder="DD/MM/YYYY"
            className="flex-1 bg-transparent border-b border-neutral-600 py-1 text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <label className="text-neutral-200 w-32">Address -:</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="flex-1 bg-transparent border-b border-neutral-600 py-1 text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <span className="text-neutral-200 w-32">Training -:</span>
          <div className="flex-1 flex items-center gap-5">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="trainingType"
                value="Trainer"
                checked={form.trainingType === "Trainer"}
                onChange={handleChange}
              />
              <span>Trainer</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="trainingType"
                value="Personal"
                checked={form.trainingType === "Personal"}
                onChange={handleChange}
              />
              <span>Personal</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <label className="text-neutral-200 w-32">Plan -:</label>
          <select
            name="planLabel"
            value={form.planLabel}
            onChange={handleChange}
            className="flex-1 bg-[#141414] text-[#84CC16] font-semibold border border-neutral-700 rounded px-2 py-1"
          >
            <option value={selectedPlan ? selectedPlan.name : "General [ 800 ]"}>
              {selectedPlan ? selectedPlan.name : "General [ 800 ]"}
            </option>
            <option value="STANDARD">STANDARD</option>
            <option value="PREMIUM">PREMIUM</option>
            <option value="GOLDEN">GOLDEN</option>
          </select>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <label className="text-neutral-200 w-32">Batch Time -:</label>
          <input
            type="text"
            name="batchTime"
            value={form.batchTime}
            onChange={handleChange}
            className="flex-1 bg-transparent border-b border-neutral-600 py-1 text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <label className="text-neutral-200 w-32">Joining Date -:</label>
          <input
            type="text"
            name="joiningDate"
            value={form.joiningDate}
            onChange={handleChange}
            className="flex-1 bg-transparent border-b border-neutral-600 py-1 text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <label className="text-neutral-200 w-32">Paid Amount -:</label>
          <input
            type="number"
            name="paidAmount"
            value={form.paidAmount}
            onChange={handleChange}
            placeholder="0"
            className="flex-1 bg-transparent border-b border-neutral-600 py-1 text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <label className="text-neutral-200 w-32">Due Amount -:</label>
          <input
            type="number"
            name="dueAmount"
            value={form.dueAmount}
            onChange={handleChange}
            className="flex-1 bg-transparent border-b border-neutral-600 py-1 text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between pb-2">
          <label className="text-neutral-200 w-32">Payment Method -:</label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="flex-1 bg-[#141414] text-white font-semibold border border-neutral-700 rounded px-2 py-1"
          >
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Transfer">Transfer</option>
          </select>
        </div>

        {error && <p className="text-red-400 text-center">{error}</p>}

        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-2 rounded-full bg-[#1e1e1e] hover:bg-[#84CC16] hover:text-black text-white font-bold border border-[#84CC16] transition cursor-pointer disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}