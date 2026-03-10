"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "./AuthContext";

export default function UserMenu() {
  const { user, loading, signIn, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (loading) return null;

  if (!user) {
    return (
      <button
        onClick={signIn}
        className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        Sign in with GitHub
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-zinc-300 p-1 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.user_metadata.avatar_url}
          alt={user.user_metadata.user_name}
          className="h-6 w-6 rounded-full"
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 mt-1.5 w-48 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          <p className="px-2 py-1 text-xs text-zinc-500">Signed in as</p>
          <p className="truncate px-2 pb-1 text-sm font-medium">
            {user.user_metadata.user_name}
          </p>
          <button
            onClick={() => { setOpen(false); signOut(); }}
            className="w-full rounded px-2 py-1 text-left text-sm text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
