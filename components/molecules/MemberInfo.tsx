import type { Miembro } from "../../types/gimnasio";

interface MemberInfoProps {
  member: Miembro;
  index: number;
}

export default function MemberInfo({ member, index }: MemberInfoProps) {
  const labelStyle = { color: "#84cc16", fontWeight: 700 };

  return (
    <div
      style={{
        width: "100%",
        fontSize: "10px",
        lineHeight: 1.4,
        color: "#ffffff",
      }}
    >
      <div>
        <span style={labelStyle}>Name : </span>
        <span>{member.name}</span>
      </div>
      <div>
        <span style={labelStyle}>🪪 M ID : </span>
        <span>{member.id ?? index + 1}</span>
      </div>
      <div>
        <span style={labelStyle}>Plan Expiry : </span>
        <span>{member.expiryDate || "01 Sep 2023"}</span>
      </div>
      <div>
        <span style={labelStyle}>Due Amount : </span>
        <span>{Number(member.dueAmount || 0)}</span>
      </div>
    </div>
  );
}