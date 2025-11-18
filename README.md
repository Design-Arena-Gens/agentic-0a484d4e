# Event Staffing Intelligence Platform

Predict staffing demand across departments for any live event scenario, blending venue capacity, risk signals, VIP mix, and historical performance. Export the insights as an automation-ready n8n workflow to orchestrate alerts and scheduling downstream.

## Stack

- Next.js 14 (App Router) + React 18
- Tailwind CSS for styling
- Recharts for workforce visualizations
- Zustand for global scenario state

## Getting Started

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm start
```

## Core Features

- Scenario designer: attendees, duration, venue, risk profile, VIP guests, and complexity levers
- Predictive staffing: AI heuristic based on venue intelligence and historical analogs
- Department-level breakdown with confidence scoring and baseline deltas
- Historical insight cards surfaced from the most relevant past events
- Interactive staffing vs. baseline chart
- One-click export of an n8n workflow blueprint containing the full automation logic
