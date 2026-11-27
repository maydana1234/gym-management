"use client";

import React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: number;
  className?: string;
}

export default function Avatar({
  src,
  alt = "Avatar",
  name = "",
  size = 48,
  className = "",
}: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || alt.trim().charAt(0).toUpperCase() || "M";

  const baseStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    minWidth: `${size}px`,
    minHeight: `${size}px`,
    borderRadius: "9999px",
    objectFit: "cover",
    border: "1.5px solid #84cc16",
    backgroundColor: "#18181b",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#84cc16",
    fontWeight: 700,
    fontSize: `${Math.max(12, Math.round(size * 0.34))}px`,
    overflow: "hidden",
    flexShrink: 0,
  };

  if (src && src.trim() !== "") {
    return (
      <img
        src={src}
        alt={alt || name || "Avatar"}
        style={baseStyle}
        className={className}
      />
    );
  }

  return (
    <span style={baseStyle} className={className} aria-label={alt || name || "Avatar"}>
      {initial}
    </span>
  );
}