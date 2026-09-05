import PropTypes from "prop-types";

export default function Card({ children, title, description, actions }) {
  return (
    <section className="rounded-lg border border-border bg-surface shadow-card">
      {(title || description || actions) && (
        <header className="flex items-start justify-between bg-surface2  gap-4 border-b border-border p-6">
          <div>
            {title && (
              <h2 className="text-xl font-semibold text-text-primary">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-sm text-text-secondary">{description}</p>
            )}
          </div>

          {actions && <div className="shrink-0">{actions}</div>}
        </header>
      )}

      <div className="p-6">{children}</div>
    </section>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  description: PropTypes.node,
  actions: PropTypes.node,
};
