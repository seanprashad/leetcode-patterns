"use client";

import { useSyncExternalStore } from "react";

const mobileQuery = "(max-width: 639px)";

function subscribeMobile(callback: () => void) {
  const mq = window.matchMedia(mobileQuery);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getMobileSnapshot() {
  return window.matchMedia(mobileQuery).matches;
}

function getMobileServerSnapshot() {
  return false;
}

export function useIsMobile() {
  return useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServerSnapshot);
}
