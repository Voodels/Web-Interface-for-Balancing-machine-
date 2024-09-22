"use client";

import Reports from "@/components/reportsComps/Reports";

export default function ReportsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-400">Reports Page</h1>
      <p>This is the content of the Reports Page.</p>
      <div>
        <Reports/>
      </div>
    </div>
  );
}
