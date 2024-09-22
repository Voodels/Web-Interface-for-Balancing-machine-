"use client";

import TestPage from "@/components/testsComps/testPage";
export default function TestsPage() {
  return (
    <div className="p-4 h-full"> {/* Add h-full here */}
      <h1 className="text-2xl font-bold text-blue-400">Tests Page</h1>
      <p>This is the content of the Tests Page.</p>
      <div className="overflow-auto m-5 h-full"> {/* Change to overflow-auto */}
        <TestPage />
      </div>
    </div>
  );
}
