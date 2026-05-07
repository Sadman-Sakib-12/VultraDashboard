import type { ChartTooltipProps } from "@/lib/types";

export default function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="rounded-xl p-3 text-xs"
      style={{
        background: "var(--bg-card)",
        border:     "1px solid var(--border)",
        boxShadow:  "var(--shadow-popup)",
        color:      "var(--text-primary)",
      }}
    >
      <p className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
        {label}
      </p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1 last:mb-0">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span style={{ color: "var(--text-secondary)" }}>{p.name}:</span>
          <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
            {p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}



