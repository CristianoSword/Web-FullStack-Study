import { MetricCard } from "../components/metric-card.jsx";
import { PerformanceBanner } from "../components/performance-banner.jsx";
import { metricsTargets } from "../lib/metrics-targets.js";

export default function HomePage() {
  return (
    <main className="shell">
      <p className="eyebrow">Vercel Observability</p>
      <h1>Study Metrics Dashboard</h1>
      <PerformanceBanner />
      <section className="grid">
        {metricsTargets.map((metric) => (
          <MetricCard key={metric.name} metric={metric} />
        ))}
      </section>
    </main>
  );
}
