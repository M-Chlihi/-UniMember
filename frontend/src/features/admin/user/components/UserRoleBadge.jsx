import Badge from "../../../../components/ui/Badge";

const variants = {
  User: "neutral",
  Editor: "warning",
  Admin: "success",
};

export default function UserRoleBadge({ roles = [] }) {
  const elevatedRole = roles.includes("Admin")
    ? "Admin"
    : roles.includes("Editor")
      ? "Editor"
      : "User";

  return (
    <Badge variant={variants[elevatedRole] ?? "neutral"}>{elevatedRole}</Badge>
  );
}
