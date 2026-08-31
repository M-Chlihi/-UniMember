import Navigation from "./Navigation";

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-surface lg:block">
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col p-4">
        <div className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-width:thin]">
          <Navigation />
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <p className="px-3 text-[10px] font-medium uppercase tracking-[0.16em] text-text-muted">
            UniMember
          </p>

          <p className="mt-2 px-3 text-xs leading-5 text-text-muted">
            Connect. Participate. Decide together.
          </p>
        </div>
      </div>
    </aside>
  );
}
