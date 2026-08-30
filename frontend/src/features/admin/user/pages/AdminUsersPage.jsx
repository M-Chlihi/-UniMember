import { useMemo, useState } from "react";

import LoadingScreen from "../../../../components/feedback/LoadingScreen";
import ErrorState from "../../../../components/feedback/ErrorState";
import EmptyState from "../../../../components/feedback/EmptyState";

import UserFilters from "../components/UserFilters";
import UserTable from "../components/UserTable";
import UserRoleDialog from "../components/UserRoleDialog";

import { useUsers } from "../hooks/useUsers";
import { useUpdateUserRoles } from "../hooks/useUpdateUserRole";

import { buildRolesPayload } from "../hooks/rolePayload";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");

  const [role, setRole] = useState("");

  const [page, setPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState(null);

  const params = useMemo(
    () => ({
      page,
      limit: 20,

      ...(search.trim()
        ? {
            search: search.trim(),
          }
        : {}),

      ...(role ? { role } : {}),
    }),
    [page, search, role],
  );

  const usersQuery = useUsers(params);

  const updateRoleMutation = useUpdateUserRoles();

  const users = usersQuery.data?.data ?? [];

  const pagination = usersQuery.data?.pagination;

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleRoleChange = (value) => {
    setRole(value);
    setPage(1);
  };

  const handleManageRole = (user) => {
    updateRoleMutation.reset();
    setSelectedUser(user);
  };
  const handleUpdateRole = async (nextRole) => {
    if (!selectedUser) {
      return;
    }

    try {
      await updateRoleMutation.mutateAsync({
        userId: selectedUser.id,

        roles: buildRolesPayload(nextRole),
      });
      console.log(selectedUser.id);

      setSelectedUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (usersQuery.isLoading) {
    return <LoadingScreen message="Loading users..." />;
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-primary">Administration</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-text-primary">
          User management
        </h1>

        <p className="mt-2 max-w-2xl text-text-secondary">
          Manage club members and their administrative roles.
        </p>
      </header>

      <UserFilters
        search={search}
        role={role}
        onSearchChange={handleSearchChange}
        onRoleChange={handleRoleChange}
      />

      {usersQuery.isError ? (
        <ErrorState
          title="Users unavailable"
          message={
            usersQuery.error?.response?.data?.message ??
            "We couldn't load users."
          }
          onRetry={usersQuery.refetch}
        />
      ) : !users.length ? (
        <EmptyState
          title="No users found"
          message={
            search || role
              ? "No users match your current filters."
              : "There are no users to display."
          }
        />
      ) : (
        <UserTable
          users={users}
          pagination={pagination}
          page={page}
          onPageChange={setPage}
          onManageRole={handleManageRole}
          isFetching={usersQuery.isFetching}
        />
      )}

      <UserRoleDialog
        user={selectedUser}
        open={Boolean(selectedUser)}
        onClose={() => !updateRoleMutation.isPending && setSelectedUser(null)}
        onSubmit={handleUpdateRole}
        loading={updateRoleMutation.isPending}
        error={updateRoleMutation.error?.response?.data?.message ?? ""}
      />
    </div>
  );
}
