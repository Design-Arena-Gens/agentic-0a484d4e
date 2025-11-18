'use client';

import { pastEvents } from "@/data/pastEvents";
import { venueProfiles } from "@/data/venues";
import { useScenarioStore } from "@/store/useScenarioStore";
import { formatNumber } from "@/lib/utils";
import { useMemo } from "react";

export const HistoricalInsights = () => {
  const scenario = useScenarioStore((state) => state.scenario);

  const relevantEvents = useMemo(() => {
    const venue = scenario.venueId;
    const type = scenario.eventType;

    return pastEvents
      .map((event) => {
        const venueMatch = event.venueId === venue;
        const typeMatch = event.eventType === type;
        const attendeeScore =
          1 -
          Math.min(
            0.99,
            Math.abs(event.attendees - scenario.expectedAttendees) /
              Math.max(event.attendees, scenario.expectedAttendees)
          );
        const durationScore =
          1 -
          Math.min(
            0.99,
            Math.abs(event.durationHours - scenario.durationHours) /
              Math.max(event.durationHours, scenario.durationHours)
          );

        const signal = (venueMatch ? 0.35 : 0) + (typeMatch ? 0.35 : 0) + attendeeScore * 0.15 + durationScore * 0.15;

        return {
          ...event,
          signal
        };
      })
      .sort((a, b) => b.signal - a.signal)
      .slice(0, 4);
  }, [scenario]);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl ring-1 ring-inset ring-white/10 backdrop-blur">
      <header className="flex items-center justify-between pb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Historical Signal Intelligence
          </h2>
          <p className="text-sm text-slate-300">
            Highest-weighted experiences powering this recommendation.
          </p>
        </div>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        {relevantEvents.map((event) => {
          const venue = venueProfiles.find((v) => v.id === event.venueId);

          return (
            <article
              key={event.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{event.name}</p>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                  {(event.signal * 100).toFixed(0)}% match
                </span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                {venue?.name} • {formatNumber(event.attendees)} guests • {event.durationHours}h • {event.eventType}
              </p>
              <dl className="mt-3 grid grid-cols-3 gap-3 text-xs text-slate-100">
                <div>
                  <dt className="text-slate-400">Security</dt>
                  <dd className="mt-1 font-mono">
                    {formatNumber(event.departmentsUsed.security)}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Catering</dt>
                  <dd className="mt-1 font-mono">
                    {formatNumber(event.departmentsUsed.catering)}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Logistics</dt>
                  <dd className="mt-1 font-mono">
                    {formatNumber(event.departmentsUsed.logistics)}
                  </dd>
                </div>
              </dl>
              {event.notes ? (
                <p className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-200">
                  {event.notes}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
};
