import { Link } from "react-router-dom";
import BrandLogo from "../brand/brandLogo";

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <BrandLogo size="md" />

          <p className="mt-2 max-w-sm text-sm leading-6 text-text-muted">
            A digital space for participation, voting, and shared decisions.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-mist-950">
          <a href="#platform" className="transition hover:text-buthover">
            Platform
          </a>

          <a href="#how-it-works" className="transition hover:text-buthover">
            How it works
          </a>

          <Link to="/login" className="transition hover:text-buthover">
            Sign in
          </Link>

          <Link to="/register" className="transition hover:text-buthover">
            Join
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-border pt-6 text-xs text-text-muted">
        © {currentYear} UniMember. All rights reserved
      </div>
    </footer>
  );
}
