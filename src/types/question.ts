export interface Company {
  name: string;
  slug: string;
  frequency: number;
}

export interface Question {
  id: number;
  title: string;
  slug: string;
  pattern: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  premium: boolean;
  companies: Company[];
}

export interface QuestionsData {
  updated: string;
  data: Question[];
}
