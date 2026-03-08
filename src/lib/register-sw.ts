export function registerServiceWorker(basePath = ""): void {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${basePath}/sw.js`).catch(() => {
      // Registration failed — offline support unavailable
    });
  });
}
