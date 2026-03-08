import { forwardRef } from "react";
import { flexRender, type Row } from "@tanstack/react-table";
import { Question } from "@/types/question";

const completedRowStyles: Record<string, string> = {
  Easy: "bg-green-100/60 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/40",
  Medium: "bg-yellow-100/60 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/40",
  Hard: "bg-red-100/60 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/40",
};

interface QuestionRowProps {
  row: Row<Question>;
  completed: Set<number>;
  toggleCompleted: (id: number) => void;
  toggleStarred: (id: number) => void;
  dataIndex: number;
}

const QuestionRow = forwardRef<HTMLTableRowElement, QuestionRowProps>(
  function QuestionRow({ row, completed, toggleCompleted, toggleStarred, dataIndex }, ref) {
    return (
      <tr
        key={row.id}
        data-index={dataIndex}
        ref={ref}
        className={
          completed.has(row.original.id)
            ? `text-zinc-400 line-through decoration-zinc-300 dark:text-zinc-500 dark:decoration-zinc-600 ${
                completedRowStyles[row.original.difficulty]
              }`
            : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
        }
      >
        {row.getVisibleCells().map((cell) => {
          const meta = cell.column.columnDef.meta as { clickable?: boolean; toggleFn?: string } | undefined;
          const isClickable = meta?.clickable;
          const onClick = isClickable
            ? () => (meta?.toggleFn === "starred" ? toggleStarred : toggleCompleted)(row.original.id)
            : undefined;
          return (
            <td
              key={cell.id}
              className={`px-2 py-2 sm:px-4 sm:py-3 ${isClickable ? "cursor-pointer select-none" : ""}`}
              onClick={onClick}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        })}
      </tr>
    );
  }
);

export default QuestionRow;
