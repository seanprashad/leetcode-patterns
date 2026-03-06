import { Suspense } from "react";
import { MessageSquarePlus } from "lucide-react";
import QuestionsTable from "@/components/QuestionsTable";
import ThemeToggle from "@/components/ThemeToggle";
import GitHubLink from "@/components/GitHubLink";
import Logo from "@/components/Logo";
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
        <div className="flex items-center gap-2">
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
      <Suspense>
        <QuestionsTable data={questions} />
      </Suspense>
    </div>
  );
}
