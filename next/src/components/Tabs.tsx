"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import QuestionTable from "./table/QuestionTable";
import Tips from "./Tips";
import Acknowledgements from "./Acknowledgements";

const tabs = ["Question List", "Tips", "Acknowledgements"] as const;

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <nav className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(index);
              trackEvent("Tabs", "Clicked Tab", `${tab} tab`);
            }}
            className={`px-4 py-2 text-sm font-medium cursor-pointer ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
      <div className="py-4">
        {activeTab === 0 && <QuestionTable />}
        {activeTab === 1 && <Tips />}
        {activeTab === 2 && <Acknowledgements />}
      </div>
    </div>
  );
}
