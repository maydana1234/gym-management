import Avatar from "../atoms/Avatar";
import MemberInfo from "../molecules/MemberInfo";
import MemberActions from "../molecules/MemberActions";
import type { Miembro } from "../../types/gimnasio";

interface MemberCardProps {
  member: Miembro;
  index: number;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function MemberCard({
  member,
  index,
  onDelete,
  onEdit,
}: MemberCardProps) {
  const id = String(member.id ?? index + 1);
  return (
    <article className="member-card">
      <button
        type="button"
        className="member-card__delete"
        onClick={() => onDelete(id)}
        title="Delete"
      >
        🗑
      </button>
      <Avatar src={member.avatar} alt={member.name} />
      <MemberInfo member={member} index={index} />
      <MemberActions
        onEdit={() => onEdit(id)}
        onAction={(act) => alert(`${act}: ${member.name} (${member.mobile || ""})`)}
      />
    </article>
  );
}