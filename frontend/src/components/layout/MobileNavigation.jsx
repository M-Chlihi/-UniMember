import { useState } from "react";
import Navigation from "./Navigation";
import Button from "../ui/Button";

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="lg:hidden"
      >
        ☰
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-black/40"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />

          <aside className="relative h-full w-72 bg-surface p-5 shadow-elevated">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-semibold">CS Club</h2>

              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                ×
              </Button>
            </div>

            <Navigation />
          </aside>
        </div>
      )}
    </>
  );
}
