import Navigation from "./Navigation";

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-surface lg:block">
      <div className="sticky top-0 h-[calc(100vh-4rem)] p-4">
        <Navigation />
      </div>
    </aside>
  );
}
