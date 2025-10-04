import Sidebar from "@/pages/provider/components/sideber";
import Topbar from "@/pages/provider/components/topber";
import React, { useState } from "react";


export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar active={active} setActive={setActive} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        <Topbar title={active} />
        <div className="flex-1 p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
