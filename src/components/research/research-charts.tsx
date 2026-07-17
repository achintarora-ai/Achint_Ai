"use client";

import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  fabricDatabricksStatus,
  tokenEconomics,
  vectorSearchLatency,
} from "@/data/research-charts";

function ChartShell({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 md:p-5">
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      {note && <p className="mt-1 text-xs text-[var(--muted)]">{note}</p>}
      <div className="mt-4 h-64 w-full">{children}</div>
    </div>
  );
}

export function VectorSearchCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartShell
        title="Query latency by configuration"
        note="Illustrative values from the vector-search research summary (mean latency orientation)."
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={vectorSearchLatency}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={60} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="latency" name="Latency (ms)" fill="var(--accent)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartShell>
      <ChartShell
        title="Recall vs monthly cost"
        note="Startup-oriented configurations from the benchmark summary."
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={vectorSearchLatency}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={60} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="recall" name="Recall %" fill="var(--blue)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="cost" name="Cost $/mo" fill="var(--accent)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartShell>
    </div>
  );
}

export function TokenEconomicsChart() {
  return (
    <ChartShell
      title="Relative cost levers (Claude Opus economics)"
      note="Indexed illustration from the token-economics guide: output and caching dominate spend."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={tokenEconomics} layout="vertical" margin={{ left: 24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="lever" width={120} tick={{ fontSize: 11 }} />
          <Tooltip />
          <Bar dataKey="relativeCost" name="Relative cost index" fill="var(--accent)" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function FabricDatabricksChart() {
  return (
    <ChartShell
      title="Capability readiness scores (pre-cloud)"
      note="Documentation + framework readiness scores. Cloud performance was NOT RUN — shown as 0."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={fabricDatabricksStatus}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="dimension" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="fabric" name="Fabric" fill="var(--blue)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="databricks" name="Databricks" fill="var(--accent)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function ResearchVisuals({ slug }: { slug: string }) {
  if (
    slug === "benchmarking-vector-search-startup-chatbots" ||
    slug === "vector-search-benchmarks-production-rag"
  ) {
    return <VectorSearchCharts />;
  }
  if (slug === "claude-opus-token-economics") {
    return <TokenEconomicsChart />;
  }
  if (slug === "microsoft-fabric-vs-azure-databricks") {
    return <FabricDatabricksChart />;
  }
  return null;
}
