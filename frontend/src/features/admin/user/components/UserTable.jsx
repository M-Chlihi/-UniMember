import UserRoleBadge from "./UserRoleBadge";
import Button from "../../../../components/ui/Button";

const formatDate = (value) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(date);
};

export default function UserTable({
  users,
  pagination,
  page,
  onPageChange,
  onManageRole,
  isFetching,
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead className="border-b border-border bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold">User</th>

              <th className="px-6 py-4 text-sm font-semibold">Email</th>

              <th className="px-6 py-4 text-sm font-semibold">Role</th>

              <th className="px-6 py-4 text-sm font-semibold">Joined</th>

              <th className="px-6 py-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-text-primary">
                    {user.username}
                  </p>
                </td>

                <td className="px-6 py-4 text-sm text-text-secondary">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <UserRoleBadge roles={user.roles} />
                </td>

                <td className="px-6 py-4 text-sm text-text-secondary">
                  {formatDate(user.createdAt)}
                </td>

                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onManageRole(user)}
                  >
                    Manage role
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-border md:hidden">
        {users.map((user) => (
          <article key={user.id} className="space-y-4 p-5">
            <div>
              <p className="font-medium text-text-primary">{user.username}</p>

              <p className="mt-1 break-all text-sm text-text-secondary">
                {user.email}
              </p>
            </div>

            <UserRoleBadge roles={user.roles} />

            <p className="text-xs text-text-muted">
              Joined {formatDate(user.createdAt)}
            </p>

            <Button
              fullWidth
              variant="secondary"
              onClick={() => onManageRole(user)}
            >
              Manage role
            </Button>
          </article>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border p-4">
          <span className="text-sm text-text-secondary">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={pagination.page <= 1 || isFetching}
              onClick={() => onPageChange(page - 1)}
            >
              Previous
            </Button>

            <Button
              variant="secondary"
              disabled={!pagination.hasNextPage || isFetching}
              onClick={() => onPageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
