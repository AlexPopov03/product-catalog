export function StateMessage({ title, body }) {
  return (
    <div className="state-message">
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  );
}
