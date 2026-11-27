import type { ReactNode } from "react";
import Logo from "../atoms/Logo";
import "./header.css";

interface HeaderProps {
  leftSymbol: string;
  onLeftClick: () => void;
  title?: string;
  children?: ReactNode;
}

export default function Header({
  leftSymbol,
  onLeftClick,
  title,
  children,
}: HeaderProps) {
  return (
    <header className="top-header">
      <div className="top-header__row">
        <button type="button" className="top-header__icon-btn" onClick={onLeftClick}>
          {leftSymbol}
        </button>
        <Logo size={34} />
        {title ? (
          <h1 className="top-header__title">{title}</h1>
        ) : (
          <span style={{ width: 20 }} />
        )}
      </div>
      {children}
    </header>
  );
}