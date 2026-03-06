import { sendGAEvent } from "@next/third-parties/google";

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  sendGAEvent("event", eventName, params ?? {});
}
