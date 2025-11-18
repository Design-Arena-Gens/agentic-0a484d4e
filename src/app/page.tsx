import { EventScenarioForm } from "@/components/EventScenarioForm";
import { HistoricalInsights } from "@/components/HistoricalInsights";
import { StaffingDistributionChart } from "@/components/StaffingDistributionChart";
import { StaffingSummary } from "@/components/StaffingSummary";
import { WorkflowBlueprintPanel } from "@/components/WorkflowBlueprintPanel";

export default function Page() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 pb-12 pt-10 md:px-8">
      <div className="grid gap-8">
        <header className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Intelligent Staffing for Live Experiences
          </p>
          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Predictive workforce planning for every event, venue and guest mix.
            </h1>
            <p className="text-lg text-slate-300">
              Blend historical staffing data with venue intelligence to deploy the perfect
              crew per department. Export an automation-ready n8n workflow to operationalize forecasts and alerts across your event portfolio.
            </p>
          </div>
        </header>

        <EventScenarioForm />
        <StaffingSummary />
        <div className="grid gap-6 lg:grid-cols-2">
          <StaffingDistributionChart />
          <HistoricalInsights />
        </div>
        <WorkflowBlueprintPanel />
      </div>
    </main>
  );
}
