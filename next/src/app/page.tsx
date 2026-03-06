"use client";

import { useEffect } from "react";
import { initGA } from "@/lib/analytics";
import Navigation from "@/components/Navigation";

export default function Home() {
  useEffect(() => {
    initGA("G-J7FBQPGZTW");
  }, []);

  return (
    <div>
      <Navigation />
      <main className="mx-auto max-w-[1200px] px-4 py-6">
        <p className="text-gray-500 dark:text-gray-400">
          Tabs and question table coming in Batch B...
        </p>
      </main>
    </div>
  );
}
