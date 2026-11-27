"use client";

import { useRouter } from "next/navigation";
import type { Miembro } from "../../types/gimnasio";
import MemberCard from "./MemberCard";

interface MemberListProps {
  members: Miembro[];
  onDelete: (id: string) => void;
}

export default function MemberList({ members, onDelete }: MemberListProps) {
  const router = useRouter();
  return (
    <div className="members-grid">
      {members.map((member, idx) => (
        <MemberCard
          key={member.id ?? idx}
          member={member}
          index={idx}
          onDelete={onDelete}
          onEdit={(id) => router.push(`/miembros/${id}/editar`)}
        />
      ))}
    </div>
  );
}