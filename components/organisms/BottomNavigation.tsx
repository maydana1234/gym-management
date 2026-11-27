"use client";

import { usePathname, useRouter } from "next/navigation";
import "./bottomNavigation.css";

export default function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { label: "Home", icon: "🏠", href: "/" },
    { label: "Members", icon: "👥", href: "/miembros" },
    { label: "Workout", icon: "🏋", href: "/miembros" },
    { label: "Diet", icon: "🥗", href: "/miembros" },
    { label: "Profile", icon: "👤", href: "/miembros" },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <button
            key={tab.label}
            type="button"
            className={`bottom-nav__item ${active ? "is-active" : ""}`}
            onClick={() => router.push(tab.href)}
          >
            <span className="bottom-nav__icon">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}