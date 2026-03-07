"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TableProperties, Map, Trophy } from "lucide-react";
import QuestionsTable from "@/components/QuestionsTable";
import RoadmapView from "@/components/RoadmapView";
import { Question } from "@/types/question";
import { beginnerRoadmap, experiencedRoadmap } from "@/data/roadmaps";
import { trackEvent } from "@/lib/analytics";

type View = "table" | "beginner" | "blind75";

const VIEW_KEY = "leetcode-patterns-view";

const views: { id: View; label: string; icon: typeof TableProperties; description: string }[] = [
  { id: "table", label: "All Questions", icon: TableProperties, description: "Browse all questions with filters" },
  { id: "beginner", label: "Beginner Roadmap", icon: Map, description: "Structured path for newcomers" },
  { id: "blind75", label: "Blind 75", icon: Trophy, description: "Must-know problems for experienced engineers" },
];

function isValidView(v: string | null): v is View {
  return v !== null && views.some((view) => view.id === v);
}

export default function ViewSwitcher({
  questions,
  updatedDate,
}: {
  questions: Question[];
  updatedDate: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeView, setActiveView] = useState<View>("table");

  useEffect(() => {
    const paramView = searchParams.get("view");
    if (isValidView(paramView)) {
      setActiveView(paramView);
      return;
    }
    const stored = localStorage.getItem(VIEW_KEY) as View | null;
    if (stored && isValidView(stored)) {
      setActiveView(stored);
    }
  }, [searchParams]);

  const switchView = (view: View) => {
    setActiveView(view);
    localStorage.setItem(VIEW_KEY, view);
    const params = new URLSearchParams(searchParams.toString());
    if (view === "table") {
      params.delete("view");
    } else {
      params.set("view", view);
    }
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : window.location.pathname, { scroll: false });
    trackEvent("switch_view", { view });
  };

  return (
    <>
      {/* View tabs */}
      <div className="mb-4 flex gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900">
        {views.map((v) => {
          const Icon = v.icon;
          const isActive = activeView === v.id;
          return (
            <button
              key={v.id}
              onClick={() => switchView(v.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{v.label}</span>
            </button>
          );
        })}
      </div>

      {/* View content */}
      {activeView === "table" && (
        <QuestionsTable data={questions} updatedDate={updatedDate} />
      )}
      {activeView === "beginner" && (
        <RoadmapView roadmap={beginnerRoadmap} questions={questions} />
      )}
      {activeView === "blind75" && (
        <RoadmapView roadmap={experiencedRoadmap} questions={questions} />
      )}
    </>
  );
}
