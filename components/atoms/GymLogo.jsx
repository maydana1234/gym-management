export default function GymLogo({ size = 56 }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="inline-flex items-center justify-center rounded-full bg-black/80 border border-neutral-600 p-1 shrink-0"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        aria-label="Training Center Logo"
      >
        <polygon
          points="50,5 90,27 90,73 50,95 10,73 10,27"
          fill="#141414"
          stroke="#d4d4d4"
          strokeWidth="4"
        />
        <text
          x="50"
          y="22"
          textAnchor="middle"
          fill="#e5e5e5"
          fontSize="7.5"
          fontWeight="bold"
          letterSpacing="0.8"
        >
          TRAINING
        </text>
        <rect x="20" y="47" width="60" height="6" rx="2" fill="#e5e5e5" />
        <rect x="24" y="38" width="7" height="24" rx="2" fill="#ffffff" />
        <rect x="32" y="41" width="5" height="18" rx="1.5" fill="#d4d4d4" />
        <rect x="63" y="41" width="5" height="18" rx="1.5" fill="#d4d4d4" />
        <rect x="69" y="38" width="7" height="24" rx="2" fill="#ffffff" />
        <polygon
          points="53,31 41,52 49,52 46,69 60,47 52,47"
          fill="#84CC16"
          stroke="#111111"
          strokeWidth="1.5"
        />
        <text
          x="50"
          y="83"
          textAnchor="middle"
          fill="#e5e5e5"
          fontSize="7.5"
          fontWeight="bold"
          letterSpacing="0.8"
        >
          CENTER
        </text>
      </svg>
    </div>
  );
}