export function MetricCard({ metric }) {
  return (
    <article className="card">
      <h2>{metric.name}</h2>
      <p>Target: {metric.target}</p>
      <p>Why it matters: {metric.reason}</p>
    </article>
  );
}
