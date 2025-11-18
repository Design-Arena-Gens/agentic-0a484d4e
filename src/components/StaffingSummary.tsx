'use client';

import { buildStaffingRecommendation, departmentKeyToLabel } from "@/lib/staffing";
import { formatNumber } from "@/lib/utils";
import { useScenarioStore } from "@/store/useScenarioStore";
import { ArrowTrendingUpIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useMemo } from "react";

export const StaffingSummary = () => {
  const scenario = useScenarioStore((state) => state.scenario);
  const recommendation = useMemo(
    () => buildStaffingRecommendation(scenario),
    [scenario]
  );

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl ring-1 ring-inset ring-white/10 backdrop-blur">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Workforce Intelligence Snapshot
          </h2>
          <p className="text-sm text-slate-300">
            Forecasted demand, confidence and department-by-department deployment.
          </p>
        </div>
        <CheckBadgeIcon className="h-10 w-10 text-emerald-400" />
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Recommended Total Staffing
          </p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {formatNumber(recommendation.totalStaff)} pros
          </p>
          <p className="mt-1 text-sm text-slate-400">{recommendation.scenarioSummary}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Data Confidence Index
          </p>
          <p className="mt-2 flex items-center gap-2 text-3xl font-semibold text-white">
            {recommendation.confidenceScore}%
            <ArrowTrendingUpIcon className="h-7 w-7 text-primary" />
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Combines historical similarity, venue familiarity and recency weighting.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Rationale Highlights
          </p>
          <ul className="mt-2 space-y-1 text-sm text-slate-300">
            {recommendation.rationale.map((insight) => (
              <li key={insight} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {recommendation.departments.map((department) => (
          <div
            key={department.key}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
          >
            <header className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">
                  {department.label}
                </p>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Confidence • {(department.confidence * 100).toFixed(0)}%
                </p>
              </div>
              <span className="rounded-lg bg-primary/30 px-2 py-1 text-xs font-semibold text-primary">
                {departmentKeyToLabel(department.key)}
              </span>
            </header>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">
                  {formatNumber(department.recommended)}
                </p>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Recommended
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">
                  Baseline: {formatNumber(department.baseline)}
                </p>
                <p className="text-sm text-slate-400">
                  Delta:{" "}
                  {department.recommended - department.baseline >= 0 ? "+" : ""}
                  {formatNumber(department.recommended - department.baseline)}
                </p>
              </div>
            </div>

            <div className="mt-4 h-2 rounded-full bg-slate-800">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-primary to-emerald-400"
                style={{
                  width: `${Math.min(
                    100,
                    (department.recommended / recommendation.totalStaff) * 100 * 4
                  ).toFixed(0)}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
