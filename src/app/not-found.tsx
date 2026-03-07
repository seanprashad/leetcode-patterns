import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div
          className="mx-auto mb-6 w-fit rounded-lg px-6 py-2 text-5xl font-bold text-amber-950 dark:text-amber-200"
          style={{ background: "linear-gradient(90deg, #FFD200, #FFA500, #FF7800)" }}
        >
          404
        </div>
        <h1 className="mb-2 text-2xl font-bold">Page not found</h1>
        <p className="mb-6 text-zinc-500">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          ← Back to questions
        </Link>
      </div>
    </div>
  );
}
