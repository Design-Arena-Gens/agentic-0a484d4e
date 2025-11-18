'use client';

import { buildWorkflowBlueprint } from "@/lib/workflow";
import { useScenarioStore } from "@/store/useScenarioStore";
import { ArrowDownTrayIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";

const copyToClipboard = async (text: string) => {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  return false;
};

export const WorkflowBlueprintPanel = () => {
  const scenario = useScenarioStore((state) => state.scenario);
  const [copied, setCopied] = useState(false);

  const workflowJson = useMemo(() => {
    const workflow = buildWorkflowBlueprint(scenario);
    return JSON.stringify(workflow, null, 2);
  }, [scenario]);

  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-xl ring-1 ring-inset ring-white/10">
      <header className="flex items-center justify-between pb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            n8n Workflow Blueprint
          </h2>
          <p className="text-sm text-slate-300">
            Import into n8n to operationalize automated forecasts and alerts.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-primary hover:text-white"
            onClick={async () => {
              const ok = await copyToClipboard(workflowJson);
              if (ok) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }
            }}
          >
            <DocumentDuplicateIcon className="h-4 w-4" />
            {copied ? "Copied" : "Copy JSON"}
          </button>
          <a
            className="flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/30"
            href={`data:application/json;charset=utf-8,${encodeURIComponent(workflowJson)}`}
            download="event-staffing-workflow.json"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Export
          </a>
        </div>
      </header>

      <pre className="mt-4 max-h-96 overflow-auto rounded-2xl border border-white/10 bg-black/60 p-4 text-xs text-emerald-200">
        {workflowJson}
      </pre>
    </section>
  );
};
