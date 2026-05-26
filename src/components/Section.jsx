export function Section({ title, detail, children }) {
  return (
    <section className="section">
      <div className="section-heading">
        <h2>{title}</h2>
        <span>{detail}</span>
      </div>
      {children}
    </section>
  );
}
