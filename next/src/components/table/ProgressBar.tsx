interface ProgressBarProps {
  name: string;
  value: number;
  total: number;
  colorClass?: string;
}

export default function ProgressBar({
  name,
  value,
  total,
  colorClass = "bg-blue-500",
}: ProgressBarProps) {
  const percent = total > 0 ? (value / total) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span>{name}</span>
        <span>
          {value}/{total}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-1.5 rounded-full ${colorClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
