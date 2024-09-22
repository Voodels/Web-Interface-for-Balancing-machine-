"use client";

import MasterUser from "@/components/masterComps/MasterUser";

export default function MasterPage() {
  return (
    <div className="p-4 m-4 ">
      <h1 className="text-2xl font-bold text-blue-400">Master Page</h1>
      <p>This is the content of the Master Page.</p>
        <div className=" h-[80vh] w-[80vh] mx-auto mt-10 overflow-scroll">
    <MasterUser/>
        </div>
    </div>
  );
}
