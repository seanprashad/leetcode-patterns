import { Suspense } from "react";
import { MessageSquarePlus } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import GitHubLink from "@/components/layout/GitHubLink";
import Logo from "@/components/layout/Logo";
import ViewSwitcher from "@/components/layout/ViewSwitcher";
import AboutPanel from "@/components/panels/AboutPanel";
import AcknowledgementsPanel from "@/components/panels/AcknowledgementsPanel";
import TipsPanel from "@/components/panels/TipsPanel";
import questionsJson from "@/data/questions.json";
import { QuestionsData } from "@/types/question";

const { data: questions } = questionsJson as QuestionsData;

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
      <div className="mb-4 flex items-start justify-between sm:mb-6">
        <div>
          <h1>
            <Logo />
          </h1>
          <p className="text-base italic text-zinc-500">
            by{" "}
            <a
              href="https://github.com/SeanPrashad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Sean Prashad
            </a>
          </p>
          <p className="mt-1 text-sm text-zinc-500 sm:mt-2 sm:text-base">
            A free and open-source collection of {questions.length} questions
            grouped by pattern to help you prep for coding interviews.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <GitHubLink />
          <span className="group/fb relative">
            <a
              href="https://github.com/SeanPrashad/leetcode-patterns/issues/new/choose"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-zinc-300 p-2 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <MessageSquarePlus className="h-4 w-4" />
            </a>
            <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity group-hover/fb:opacity-100 dark:bg-zinc-200 dark:text-zinc-900">
              Feedback
            </span>
          </span>
          <ThemeToggle />
        </div>
      </div>
      {/* Side panel tabs – stacked flush in a fixed column */}
      <div className="fixed left-0 top-0 bottom-0 z-30 flex flex-col items-start justify-center max-[1439px]:hidden">
        <AboutPanel />
        <TipsPanel />
        <AcknowledgementsPanel />
      </div>
      <Suspense>
        <ViewSwitcher
          questions={questions}
          updatedDate={questionsJson.updated}
        />
      </Suspense>
    </div>
  );
}
