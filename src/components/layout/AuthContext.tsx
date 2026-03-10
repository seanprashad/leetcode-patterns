"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { downloadAndMerge, scheduleUpload, mergeFromRealtimePayload } from "@/lib/sync";
import { trackEvent } from "@/lib/analytics";
import type { User } from "@supabase/supabase-js";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  syncNow: () => void;
  syncVersion: number;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  syncNow: () => {},
  syncVersion: 0,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncVersion, setSyncVersion] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);
  const [toastFading, setToastFading] = useState(false);
  const realtimeChannelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    if (!toast) return;
    const fadeTimer = setTimeout(() => setToastFading(true), 3000);
    const removeTimer = setTimeout(() => { setToast(null); setToastFading(false); }, 3700);
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
  }, [toast]);

  // Subscribe to realtime changes when user is signed in
  useEffect(() => {
    if (!user) {
      // Clean up any existing subscription
      if (realtimeChannelRef.current) {
        supabase.removeChannel(realtimeChannelRef.current);
        realtimeChannelRef.current = null;
      }
      return;
    }

    const channel = supabase
      .channel("user_progress_sync")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "user_progress",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const changed = mergeFromRealtimePayload(payload.new);
          if (changed) {
            trackEvent("realtime_sync");
            setSyncVersion((v) => v + 1);
          }
        }
      )
      .subscribe();

    realtimeChannelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
      realtimeChannelRef.current = null;
    };
  }, [user]);

  useEffect(() => {
    // Next.js App Router clears the URL hash during hydration before
    // Supabase can detect it. We capture it early in an inline <script>
    // and fall back to setSession if auto-detection missed it.
    const savedHash = (window as Record<string, unknown>).__SUPABASE_AUTH_HASH__ as string | undefined;
    if (savedHash) {
      delete (window as Record<string, unknown>).__SUPABASE_AUTH_HASH__;
      const params = new URLSearchParams(savedHash.substring(1));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      if (accessToken && refreshToken) {
        supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      setLoading(false);
      if (u) downloadAndMerge(u.id).then(() => setSyncVersion((v) => v + 1));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) downloadAndMerge(u.id).then(() => setSyncVersion((v) => v + 1));
      if (event === "SIGNED_IN") {
        trackEvent("sign_in", { provider: "github" });
        setToast({ message: `Signed in as ${u?.user_metadata?.user_name ?? "user"}`, type: "success" });
      }
      if (event === "SIGNED_OUT") {
        trackEvent("sign_out");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async () => {
    const redirectTo = typeof window !== "undefined"
      ? window.location.origin + window.location.pathname.replace(/\/?$/, "/")
      : undefined;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo, scopes: "" },
    });
    if (error) {
      trackEvent("sign_in_error", { error: error.message });
      setToast({ message: `Sign in failed: ${error.message}`, type: "error" });
    }
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setToast({ message: `Sign out failed: ${error.message}`, type: "error" });
    } else {
      setUser(null);
      setToast({ message: "Signed out", type: "success" });
    }
  }, []);

  const syncNow = useCallback(() => {
    if (user) scheduleUpload(user.id);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, syncNow, syncVersion }}>
      {children}
      {toast && (
        <div
          className={`fixed inset-x-0 bottom-6 z-50 mx-auto w-fit animate-[fadeInUp_0.3s_ease-out] rounded-lg border px-4 py-3 text-sm font-medium shadow-lg transition-opacity duration-700 ease-in-out ${
            toast.type === "error"
              ? "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
              : "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200"
          } ${toastFading ? "opacity-0" : "opacity-100"}`}
        >
          {toast.type === "error" ? "✕" : "✓"} {toast.message}
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
