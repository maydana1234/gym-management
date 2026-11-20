"use client";

export default function GymLogo({ size = 56 }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-[#111111] border-2 border-[#84CC16] flex flex-col items-center justify-center select-none shadow-sm shrink-0"
    >
      <span
        style={{ fontSize: Math.max(12, Math.round(size * 0.34)) }}
        className="leading-none font-black text-[#84CC16]"
      >
        ⚡
      </span>
      <span
        style={{ fontSize: Math.max(7, Math.round(size * 0.14)) }}
        className="mt-0.5 font-extrabold tracking-wider text-white uppercase leading-none"
      >
        GYM
      </span>
    </div>
  );
}