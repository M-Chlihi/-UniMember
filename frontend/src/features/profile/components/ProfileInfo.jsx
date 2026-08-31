const formatDate = (value) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
  }).format(date);
};

export default function ProfileInfo({ user, role }) {
  return (
    <section className="rounded-2xl border border-border bg-surface">
      <div className="border-b border-border px-6 py-5 sm:px-8">
        <h2 className="text-lg font-semibold text-text-primary">
          Account information
        </h2>

        <p className="mt-1 text-sm text-text-secondary">
          Information associated with your UniMember account.
        </p>
      </div>
      <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            Account status
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            Your account is currently active.
          </p>
        </div>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Active
        </div>
      </section>
      <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            Username
          </p>

          <p className="mt-2 text-sm font-medium text-text-primary">
            {user?.username || "—"}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            Role
          </p>

          <p className="mt-2 text-sm font-medium text-text-primary">{role}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            Email
          </p>

          <p className="mt-2 break-all text-sm font-medium text-text-primary">
            {user?.email || "—"}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            Member since
          </p>

          <p className="mt-2 text-sm font-medium text-text-primary">
            {formatDate(user?.createdAt)}
          </p>
        </div>
      </div>
    </section>
  );
}
