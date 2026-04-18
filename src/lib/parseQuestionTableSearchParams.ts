import type { ColumnFiltersState } from "@tanstack/react-table";

export function parseInitialQuestionTableFilters(searchParams: URLSearchParams): ColumnFiltersState {
  const filters: ColumnFiltersState = [];
  const difficulty = searchParams.get("difficulty");
  if (difficulty) filters.push({ id: "difficulty", value: difficulty.split(",") });
  const pattern = searchParams.get("pattern");
  if (pattern) filters.push({ id: "pattern", value: pattern.split(",") });
  const companies = searchParams.get("companies");
  if (companies) filters.push({ id: "companies", value: companies.split(",") });
  return filters;
}
