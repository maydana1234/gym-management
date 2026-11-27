import Icon from "../atoms/Icon";

interface MemberActionsProps {
  onEdit: () => void;
  onAction: (action: string) => void;
}

export default function MemberActions({
  onEdit,
  onAction,
}: MemberActionsProps) {
  const items = [
    { icon: "📞", label: "Call", action: () => onAction("Call") },
    { icon: "💬", label: "Whatsapp", action: () => onAction("Whatsapp") },
    { icon: "🔄", label: "Renew Plan", action: onEdit },
    { icon: "✉", label: "Message", action: () => onAction("Message") },
    { icon: "🚫", label: "Block", action: () => onAction("Block") },
  ];

  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "2px",
        marginTop: "6px",
        textAlign: "center",
      }}
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={item.action}
          style={{
            background: "transparent",
            border: "none",
            color: "#ffffff",
            cursor: "pointer",
            padding: "2px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <Icon symbol={item.icon} size={11} />
          <span style={{ fontSize: "7.5px", whiteSpace: "nowrap" }}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}