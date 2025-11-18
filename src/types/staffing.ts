export type VenueProfile = {
  id: string;
  name: string;
  capacity: number;
  zones: number;
  layoutComplexity: "simple" | "moderate" | "complex";
  indoorOutdoor: "indoor" | "outdoor" | "hybrid";
};

export type DepartmentKey =
  | "operations"
  | "catering"
  | "security"
  | "tech"
  | "hospitality"
  | "logistics";

export type DepartmentBreakdown = Record<DepartmentKey, number>;

export type PastEventRecord = {
  id: string;
  name: string;
  eventType:
    | "corporate"
    | "wedding"
    | "festival"
    | "conference"
    | "concert"
    | "sports";
  date: string;
  attendees: number;
  durationHours: number;
  venueId: string;
  departmentsUsed: DepartmentBreakdown;
  notes?: string;
};

export type EventScenario = {
  name: string;
  eventType: PastEventRecord["eventType"];
  expectedAttendees: number;
  durationHours: number;
  venueId: string;
  riskProfile: "low" | "medium" | "high";
  vipGuests: number;
  complexityModifiers: {
    catering: number;
    logistics: number;
    hospitality: number;
  };
};

export type StaffingRecommendation = {
  totalStaff: number;
  departments: {
    key: DepartmentKey;
    label: string;
    recommended: number;
    baseline: number;
    confidence: number;
  }[];
  rationale: string[];
  confidenceScore: number;
  scenarioSummary: string;
};

export type WorkflowNode = {
  id: string;
  name: string;
  type: string;
  position: [number, number];
  parameters?: Record<string, unknown>;
  credentials?: Record<string, unknown>;
};

export type WorkflowConnection = {
  source: string;
  sourceOutput: string;
  target: string;
  targetInput: string;
};

export type WorkflowBlueprint = {
  name: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  settings?: Record<string, unknown>;
};
