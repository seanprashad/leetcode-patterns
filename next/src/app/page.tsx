"use client";

import { useEffect } from "react";
import { initGA } from "@/lib/analytics";
import Navigation from "@/components/Navigation";
import Tabs from "@/components/Tabs";

export default function Home() {
  useEffect(() => {
    initGA("G-J7FBQPGZTW");
  }, []);

  return (
    <div>
      <Navigation />
      <main className="mx-auto max-w-[1200px] px-4 py-6">
        <Tabs />
      </main>
    </div>
  );
}
