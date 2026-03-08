import { forwardRef } from "react";
import { ChevronRight, ChevronDown, RotateCcw } from "lucide-react";

const difficultyColor: Record<string, string> = {
  Easy: "text-green-700 dark:text-green-400",
  Medium: "text-yellow-700 dark:text-yellow-400",
  Hard: "text-red-700 dark:text-red-400",
};

const groupRowStyles: Record<string, string> = {
  Easy: "border-l-green-500 bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50",
  Medium: "border-l-yellow-500 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50",
  Hard: "border-l-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50",
};

interface GroupHeaderRowProps {
  groupKey: string;
  groupDone: number;
  total: number;
  isCollapsed: boolean;
  toggleGroup: (group: string) => void;
  setResetConfirmGroup: (group: string) => void;
  colSpan: number;
  dataIndex: number;
}

const GroupHeaderRow = forwardRef<HTMLTableRowElement, GroupHeaderRowProps>(
  function GroupHeaderRow({ groupKey, groupDone, total, isCollapsed, toggleGroup, setResetConfirmGroup, colSpan, dataIndex }, ref) {
    return (
      <tr
        key={`header-${groupKey}`}
        data-index={dataIndex}
        ref={ref}
        className={`cursor-pointer select-none border-l-4 ${groupRowStyles[groupKey] ?? ""}`}
        onClick={() => toggleGroup(groupKey)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleGroup(groupKey); } }}
        tabIndex={0}
        role="button"
        aria-expanded={!isCollapsed}
        aria-label={`${groupKey} group, ${groupDone} of ${total} completed`}
      >
        <td
          colSpan={colSpan}
          className="px-2 py-2.5 sm:px-4 sm:py-3"
        >
          <span className="flex items-center gap-2">
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className={`text-base font-bold ${difficultyColor[groupKey] ?? ""}`}>
              {groupKey}
            </span>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {groupDone}/{total} completed
            </span>
            {groupDone > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setResetConfirmGroup(groupKey);
                }}
                className="ml-auto flex items-center gap-1 rounded px-1.5 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-600 dark:hover:bg-zinc-600 dark:hover:text-zinc-300"
              >
                <RotateCcw className="h-3 w-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </span>
        </td>
      </tr>
    );
  }
);

export default GroupHeaderRow;
