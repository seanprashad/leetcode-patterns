"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/lib/register-sw";

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    registerServiceWorker(process.env.NEXT_PUBLIC_BASE_PATH ?? "");
  }, []);

  return null;
}
