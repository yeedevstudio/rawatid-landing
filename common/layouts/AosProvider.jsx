"use client";

import { useEffect } from "react";
import "aos/dist/aos.css";

export default function AOSProvider({ children }) {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { default: AOS } = await import("aos");
      if (cancelled) return;

      const init = () => {
        if (cancelled) return;
        AOS.init({
          duration: 1000,
          once: true,
        });
      };

      const scheduleInit = () => {
        if (cancelled) return;
        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
          window.requestIdleCallback(init, { timeout: 2000 });
          return;
        }
        setTimeout(init, 0);
      };

      if (typeof window !== "undefined" && document?.readyState === "complete") {
        scheduleInit();
      } else if (typeof window !== "undefined") {
        window.addEventListener("load", scheduleInit, { once: true });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <main className="transition-all duration-200">{children}</main>;
}
