'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useMemo } from "react";
import { useScenarioStore } from "@/store/useScenarioStore";
import { buildStaffingRecommendation } from "@/lib/staffing";

const chartColors = {
  recommended: "#3B82F6",
  baseline: "#38BDF8"
};

const CustomTooltip = ({
  active,
  payload,
  label
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white shadow">
      <p className="font-semibold">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span>
            {entry.name}:{" "}
            <span className="font-mono">{entry.value.toLocaleString()}</span>
          </span>
        </p>
      ))}
    </div>
  );
};

export const StaffingDistributionChart = () => {
  const scenario = useScenarioStore((state) => state.scenario);

  const chartData = useMemo(() => {
    const recommendation = buildStaffingRecommendation(scenario);
    return recommendation.departments.map((dept) => ({
      name: dept.label,
      Recommended: dept.recommended,
      Baseline: dept.baseline
    }));
  }, [scenario]);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl ring-1 ring-inset ring-white/10 backdrop-blur">
      <header className="flex items-center justify-between pb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Deployment Comparison
          </h2>
          <p className="text-sm text-slate-300">
            Contrast optimized staffing vs. baseline distribution from historical analogs.
          </p>
        </div>
        <div className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          Historical blended model
        </div>
      </header>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="Baseline"
              fill={chartColors.baseline}
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="Recommended"
              fill={chartColors.recommended}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
