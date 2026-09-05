import MobileNavigation from "./MobileNavigation";

import { Bell } from "lucide-react";

import UserMenu from "./UserMenu";
import BrandLogo from "../../features/public/brand/brandLogo";

export default function Navbar() {
  return (
    <header className=" shadow-[0_18px_100px_rgba(15,23,42,0.12)] sticky top-0 z-40 border-b border-border/80 backdrop-blur-xl bg-gradient-to-b from-[#7209b7] from-0% via-white/95 to-white to-100%">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="lg:hidden">
            <MobileNavigation />
          </div>
          <BrandLogo size="md" />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="relative inline-flex size-10 items-center justify-center rounded-full text-text-secondary transition hover:bg-slate-100 hover:text-text-primary"
            aria-label="Notifications"
          >
            <Bell size={18} strokeWidth={1.8} />

            {/* Keep this visually subtle until the notification-center feature is implemented */}
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-brand" />
          </button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
