import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQuestionProgress } from "@/hooks/use-question-progress";
import { questions } from "@/lib/questions";

describe("useQuestionProgress", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes with all unchecked", () => {
    const { result } = renderHook(() => useQuestionProgress());
    expect(result.current.checked.every((c) => c === false)).toBe(true);
    expect(result.current.difficultyCount.Total).toBe(0);
  });

  it("toggles a question check", () => {
    const { result } = renderHook(() => useQuestionProgress());
    const question = questions[0];
    act(() => {
      result.current.toggleCheck(question.id, question.difficulty);
    });
    expect(result.current.checked[question.id]).toBe(true);
    expect(result.current.checkedAt[question.id]).toBeTruthy();
    expect(result.current.difficultyCount[question.difficulty]).toBe(1);
    expect(result.current.difficultyCount.Total).toBe(1);
  });

  it("unchecks a checked question", () => {
    const { result } = renderHook(() => useQuestionProgress());
    const question = questions[0];
    act(() => {
      result.current.toggleCheck(question.id, question.difficulty);
    });
    act(() => {
      result.current.toggleCheck(question.id, question.difficulty);
    });
    expect(result.current.checked[question.id]).toBe(false);
    expect(result.current.checkedAt[question.id]).toBeNull();
    expect(result.current.difficultyCount.Total).toBe(0);
  });

  it("resets all progress", () => {
    const { result } = renderHook(() => useQuestionProgress());
    act(() => {
      result.current.toggleCheck(questions[0].id, questions[0].difficulty);
      result.current.toggleCheck(questions[1].id, questions[1].difficulty);
    });
    act(() => {
      result.current.reset();
    });
    expect(result.current.checked.every((c) => c === false)).toBe(true);
    expect(result.current.difficultyCount.Total).toBe(0);
  });

  it("resizes when localStorage has shorter array", () => {
    localStorage.setItem("checked", JSON.stringify([true, false]));
    const { result } = renderHook(() => useQuestionProgress());
    expect(result.current.checked.length).toBe(questions.length);
    expect(result.current.checked[0]).toBe(true);
    expect(result.current.checked[2]).toBe(false);
  });
});
