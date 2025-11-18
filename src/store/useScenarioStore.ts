import { create } from "zustand";
import type { EventScenario } from "@/types/staffing";

const defaults: EventScenario = {
  name: "Flagship Product Launch",
  eventType: "corporate",
  expectedAttendees: 2000,
  durationHours: 9,
  venueId: "atrium-center",
  riskProfile: "medium",
  vipGuests: 120,
  complexityModifiers: {
    catering: 1.1,
    logistics: 1.0,
    hospitality: 1.15
  }
};

type ScenarioState = {
  scenario: EventScenario;
  updateScenario: (partial: Partial<EventScenario>) => void;
};

export const useScenarioStore = create<ScenarioState>((set) => ({
  scenario: defaults,
  updateScenario: (partial) =>
    set((state) => ({
      scenario: {
        ...state.scenario,
        ...partial,
        complexityModifiers: {
          ...state.scenario.complexityModifiers,
          ...(partial.complexityModifiers ?? {})
        }
      }
    }))
}));
