export default function PhoneFrame({ children, label }) {
  return (
    <div className="mx-auto w-full max-w-[340px]">
      {label && (
        <p className="text-[11px] text-neutral-400 mb-1.5 text-center font-medium">
          {label}
        </p>
      )}
      <div className="rounded-[34px] border-[3px] border-neutral-700 bg-[#070707] shadow-[0_0_25px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col h-[710px]">
        {/* Barra de estado superior tipo celular */}
        <div className="bg-black text-white px-4 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-semibold select-none shrink-0">
          <span>1:22</span>
          <div className="flex items-center gap-1.5">
            <span>📶</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Contenido de la pantalla */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </div>

        {/* Barra inferior tipo Android / iPhone */}
        <div className="bg-black py-2 flex justify-center shrink-0">
          <div className="w-24 h-1 rounded-full bg-neutral-400" />
        </div>
      </div>
    </div>
  );
}