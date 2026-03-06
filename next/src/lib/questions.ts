import rawData from "@/data/questions.json";
import type { Question, QuestionsData } from "@/types/question";

const { updated, data } = rawData as unknown as QuestionsData;

const sortOrder: Record<string, number> = { Easy: 0, Medium: 1, Hard: 2 };

const questions: Question[] = data
  .map((q) => ({
    ...q,
    companyNames: q.companies.map((c) => c.name),
    checkbox: "Unchecked" as const,
  }))
  .sort((a, b) => sortOrder[a.difficulty] - sortOrder[b.difficulty]);

export { questions, updated };
