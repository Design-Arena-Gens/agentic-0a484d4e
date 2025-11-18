'use client';

import { venueProfiles } from "@/data/venues";
import { useScenarioStore } from "@/store/useScenarioStore";
import type { EventScenario } from "@/types/staffing";
import { Listbox, Transition } from "@headlessui/react";
import {
  ChevronUpDownIcon,
  CheckIcon,
  UsersIcon,
  ClockIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import classNames from "classnames";

const eventTypes: { label: string; value: EventScenario["eventType"] }[] = [
  { label: "Corporate Experience", value: "corporate" },
  { label: "Conference", value: "conference" },
  { label: "Festival", value: "festival" },
  { label: "Wedding", value: "wedding" },
  { label: "Concert", value: "concert" },
  { label: "Sports Event", value: "sports" }
];

const riskProfiles: { label: string; value: EventScenario["riskProfile"] }[] = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" }
];

const modifiers = [
  {
    key: "catering" as const,
    label: "Culinary Complexity",
    description: "Chef-driven tasting menus, dietary coverage and satellite bars."
  },
  {
    key: "logistics" as const,
    label: "Logistics Difficulty",
    description: "Multi-day load-in, city permits, or hard-to-access venues."
  },
  {
    key: "hospitality" as const,
    label: "Hospitality Expectations",
    description: "VIP hosting, concierge desks, multilingual support."
  }
];

const modifierSteps = [0.85, 1, 1.1, 1.2, 1.35];

const modifierLabel = (value: number) => {
  if (value <= 0.9) return "Lean";
  if (value <= 1.05) return "Baseline";
  if (value <= 1.15) return "Elevated";
  if (value <= 1.25) return "High Touch";
  return "Premium";
};

export const EventScenarioForm = () => {
  const { scenario, updateScenario } = useScenarioStore();

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl ring-1 ring-inset ring-white/10 backdrop-blur">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Event Scenario
          </h2>
          <p className="text-sm text-slate-300">
            Define the event blueprint to forecast departmental staffing demand.
          </p>
        </div>
        <SparklesIcon className="h-8 w-8 text-primary" />
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">Event name</label>
          <input
            className="w-full rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:ring-2 focus:ring-primary/70"
            value={scenario.name}
            onChange={(event) => updateScenario({ name: event.target.value })}
            placeholder="Experience name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">Event type</label>
          <Listbox
            value={scenario.eventType}
            onChange={(value) => updateScenario({ eventType: value })}
          >
            {({ open }) => (
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-xl border border-white/10 bg-slate-900/70 py-3 pl-4 pr-10 text-left text-sm text-white focus:border-primary focus:ring-2 focus:ring-primary/70">
                  <span className="block truncate">
                    {
                      eventTypes.find((option) => option.value === scenario.eventType)
                        ?.label
                    }
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon className="h-5 w-5 text-slate-400" />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-white/10 bg-slate-900/90 py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {eventTypes.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        className={({ active }) =>
                          classNames(
                            "relative cursor-default select-none py-2 pl-10 pr-4 text-white",
                            active ? "bg-primary/40" : ""
                          )
                        }
                        value={option.value}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={classNames(
                                "block truncate",
                                selected ? "font-medium" : "font-normal"
                              )}
                            >
                              {option.label}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                <CheckIcon className="h-5 w-5" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            )}
          </Listbox>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">Venue</label>
          <Listbox
            value={scenario.venueId}
            onChange={(value) => updateScenario({ venueId: value })}
          >
            {({ open }) => (
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-xl border border-white/10 bg-slate-900/70 py-3 pl-4 pr-10 text-left text-sm text-white focus:border-primary focus:ring-2 focus:ring-primary/70">
                  <span className="block truncate">
                    {venueProfiles.find((venue) => venue.id === scenario.venueId)?.name}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon className="h-5 w-5 text-slate-400" />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-white/10 bg-slate-900/90 py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {venueProfiles.map((venue) => (
                      <Listbox.Option
                        key={venue.id}
                        className={({ active }) =>
                          classNames(
                            "relative cursor-default select-none py-2 pl-10 pr-4 text-white",
                            active ? "bg-primary/40" : ""
                          )
                        }
                        value={venue.id}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={classNames(
                                "block truncate",
                                selected ? "font-medium" : "font-normal"
                              )}
                            >
                              {venue.name} • {venue.capacity.toLocaleString()} cap.
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                <CheckIcon className="h-5 w-5" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            )}
          </Listbox>
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-400">
              Attendees
            </label>
            <div className="mt-1 flex items-center gap-3 text-white">
              <UsersIcon className="h-6 w-6 text-primary" />
              <input
                type="number"
                min={50}
                className="w-full rounded-lg border border-white/10 bg-slate-950/70 p-2 text-sm text-white focus:border-primary focus:ring-2 focus:ring-primary/70"
                value={scenario.expectedAttendees}
                onChange={(event) =>
                  updateScenario({ expectedAttendees: Number(event.target.value) })
                }
              />
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-400">
              Duration (hours)
            </label>
            <div className="mt-1 flex items-center gap-3 text-white">
              <ClockIcon className="h-6 w-6 text-primary" />
              <input
                type="number"
                min={2}
                max={72}
                className="w-full rounded-lg border border-white/10 bg-slate-950/70 p-2 text-sm text-white focus:border-primary focus:ring-2 focus:ring-primary/70"
                value={scenario.durationHours}
                onChange={(event) =>
                  updateScenario({ durationHours: Number(event.target.value) })
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">
            Risk profile & compliance
          </label>
          <div className="flex gap-2">
            {riskProfiles.map((option) => (
              <button
                key={option.value}
                className={classNames(
                  "flex-1 rounded-xl border px-3 py-3 text-sm font-medium tracking-tight transition",
                  option.value === scenario.riskProfile
                    ? "border-primary/60 bg-primary/20 text-white shadow"
                    : "border-white/10 bg-slate-900/70 text-slate-300 hover:border-white/20 hover:text-white"
                )}
                onClick={() => updateScenario({ riskProfile: option.value })}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">
            VIP guests requiring premium coverage
          </label>
          <input
            type="number"
            min={0}
            className="w-full rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-white focus:border-primary focus:ring-2 focus:ring-primary/70"
            value={scenario.vipGuests}
            onChange={(event) =>
              updateScenario({ vipGuests: Number(event.target.value) })
            }
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {modifiers.map((modifier) => (
          <div
            key={modifier.key}
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">{modifier.label}</p>
                <p className="text-xs text-slate-400">{modifier.description}</p>
              </div>
              <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                {modifierLabel(scenario.complexityModifiers[modifier.key])}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              {modifierSteps.map((step) => (
                <button
                  key={step}
                  className={classNames(
                    "flex-1 rounded-lg border px-2 py-2 text-xs font-semibold transition",
                    scenario.complexityModifiers[modifier.key] === step
                      ? "border-primary/80 bg-primary/40 text-white"
                      : "border-white/10 bg-slate-900/80 text-slate-300 hover:border-white/30"
                  )}
                  onClick={() =>
                    updateScenario({
                      complexityModifiers: {
                        ...scenario.complexityModifiers,
                        [modifier.key]: step
                      }
                    })
                  }
                >
                  ×{step.toFixed(2)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
