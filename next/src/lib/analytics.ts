"use client";

import ReactGA from "react-ga4";

export function initGA(trackingId: string) {
  ReactGA.initialize([{ trackingId }]);
}

export function trackEvent(category: string, action: string, label: string) {
  ReactGA.event({ category, action, label });
}
