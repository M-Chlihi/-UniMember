import Input from "../../../../components/ui/input";

export default function UserFilters({
  search,
  role,
  onSearchChange,
  onRoleChange,
}) {
  return (
    <section className="rounded-lg border border-border bg-surface p-4">
      <div className="grid gap-4 md:grid-cols-[1fr_200px]">
        <Input
          id="user-search"
          label="Search users"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Username or email"
        />

        <div className="space-y-2">
          <label
            htmlFor="user-role"
            className="block text-sm font-medium text-text-primary"
          >
            Role
          </label>

          <select
            id="user-role"
            value={role}
            onChange={(event) => onRoleChange(event.target.value)}
            className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text-primary"
          >
            <option value="">All roles</option>

            <option value="User">User</option>

            <option value="Editor">Editor</option>

            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>
    </section>
  );
}
