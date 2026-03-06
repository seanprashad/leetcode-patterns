import { describe, it, expect } from "vitest";
import { questions, updated } from "@/lib/questions";

describe("questions data", () => {
  it("exports an updated date string", () => {
    expect(updated).toBeDefined();
    expect(typeof updated).toBe("string");
  });

  it("sorts questions by difficulty: Easy < Medium < Hard", () => {
    const order = { Easy: 0, Medium: 1, Hard: 2 };
    for (let i = 1; i < questions.length; i++) {
      expect(order[questions[i].difficulty]).toBeGreaterThanOrEqual(
        order[questions[i - 1].difficulty],
      );
    }
  });

  it("computes companyNames for each question", () => {
    for (const q of questions) {
      expect(q.companyNames).toBeDefined();
      expect(q.companyNames).toEqual(q.companies.map((c) => c.name));
    }
  });

  it("initializes checkbox as Unchecked", () => {
    for (const q of questions) {
      expect(q.checkbox).toBe("Unchecked");
    }
  });
});
