"use client";

import Input from "../atoms/Input";
import "./searchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search Member by Name or ID",
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon">🔍</span>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-bar__input"
      />
    </div>
  );
}