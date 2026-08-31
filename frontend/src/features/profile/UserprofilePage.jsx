import { useMemo } from "react";

import { ArrowLeft } from "lucide-react";

import { Link } from "react-router-dom";

import { useAuth } from "../auth/hooks/useAuth";

import ProfileHeader from "./components/ProfileHeader";
import ProfileInfo from "./components/ProfileInfo";

export default function ProfilePage() {
  const { user } = useAuth();
  console.log(user);
  const role = useMemo(() => {
    const roles = user?.roles ?? [];

    if (roles.includes("Admin")) {
      return "Admin";
    }

    if (roles.includes("Editor")) {
      return "Editor";
    }

    return "User";
  }, [user?.roles]);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <header>
        <Link
          to="/member"
          className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to dashboard
        </Link>

        <p className="mt-6 text-sm font-medium text-brand">Account</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-text-primary">
          Profile
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
          Manage and review your UniMember account information.
        </p>
      </header>

      <ProfileHeader user={user} role={role} />

      <ProfileInfo user={user} role={role} />
    </div>
  );
}
