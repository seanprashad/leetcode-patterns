export interface ProgressStats {
  totals: { Easy: number; Medium: number; Hard: number };
  done: { Easy: number; Medium: number; Hard: number };
  total: number;
  totalDone: number;
}

export default function ProgressBar({ stats, pct }: { stats: ProgressStats; pct: number }) {
  return (
    <div className="group relative rounded-lg border border-zinc-200 bg-zinc-50 p-3 sm:p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
        <span>{stats.totalDone}/{stats.total} completed ({pct}%)</span>
        <div className="flex gap-4 sm:opacity-0 sm:transition-opacity sm:duration-500 sm:ease-in-out sm:group-hover:opacity-100">
          {stats.totals.Easy > 0 && (
            <span className="text-green-700 dark:text-green-400">
              Easy: {stats.done.Easy}/{stats.totals.Easy}
            </span>
          )}
          {stats.totals.Medium > 0 && (
            <span className="text-yellow-700 dark:text-yellow-400">
              Medium: {stats.done.Medium}/{stats.totals.Medium}
            </span>
          )}
          {stats.totals.Hard > 0 && (
            <span className="text-red-700 dark:text-red-400">
              Hard: {stats.done.Hard}/{stats.totals.Hard}
            </span>
          )}
        </div>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Completion progress">
        {/* Default: solid blue bar */}
        <div
          className="absolute inset-0 h-full bg-blue-500 transition-opacity duration-500 ease-in-out sm:group-hover:opacity-0 max-sm:hidden"
          style={{ width: `${pct}%` }}
        />
        {/* Hover: blended difficulty gradient */}
        <div
          className="absolute inset-0 h-full transition-opacity duration-500 ease-in-out max-sm:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          style={{
            width: `${pct}%`,
            background: (() => {
              if (!stats.totalDone) return "var(--color-green-500)";
              const easyPct = (stats.done.Easy / stats.totalDone) * 100;
              const medPct = ((stats.done.Easy + stats.done.Medium) / stats.totalDone) * 100;
              return `linear-gradient(90deg, var(--color-green-500) ${Math.max(easyPct - 3, 0)}%, var(--color-yellow-500) ${Math.min(easyPct + 3, medPct - 3)}%, var(--color-yellow-500) ${Math.max(medPct - 3, easyPct + 3)}%, var(--color-red-500) ${medPct + 3}%)`;
            })(),
          }}
        />
      </div>

    </div>
  );
}
