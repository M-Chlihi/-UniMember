import Avatar from "../../../components/ui/Avatar";

export default function ProfileHeader({ user, role }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-gradient-to-br from-brand/10 via-brand-violet/10 to-transparent blur-3xl"
      />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
        <Avatar name={user?.username} size="lg" />

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            UniMember account
          </p>

          <h2 className="mt-2 truncate text-2xl font-semibold tracking-tight text-text-primary">
            {user?.username}
          </h2>

          <p className="mt-1 break-all text-sm text-text-secondary">
            {user?.email}
          </p>

          <div className="mt-4 inline-flex rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            {role}
          </div>
        </div>
      </div>
    </section>
  );
}
