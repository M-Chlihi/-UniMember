import { useEffect, useState } from "react";

import Button from "../../../../components/ui/Button";
import Modal from "../../../../components/ui/Modal";

const roles = ["User", "Editor", "Admin"];

const getPrimaryRole = (roles = []) => {
  if (roles.includes("Admin")) {
    return "Admin";
  }

  if (roles.includes("Editor")) {
    return "Editor";
  }

  return "User";
};

export default function UserRoleDialog({
  user,
  open,
  onClose,
  onSubmit,
  loading,
  error,
}) {
  const [role, setRole] = useState("User");

  useEffect(() => {
    if (user) {
      setRole(getPrimaryRole(user.roles));
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Manage user role"
      description="Update the administrative role assigned to this member."
      size="sm"
    >
      <div className="space-y-6">
        <div>
          <p className="font-medium text-text-primary">{user.username}</p>

          <p className="mt-1 break-all text-sm text-text-secondary">
            {user.email}
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="user-role-dialog"
            className="block text-sm font-medium text-text-primary"
          >
            Role
          </label>

          <select
            id="user-role-dialog"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            disabled={loading}
            className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {roles.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            type="button"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={() => onSubmit(role)}
            loading={loading}
          >
            Save role
          </Button>
        </div>
      </div>
    </Modal>
  );
}
