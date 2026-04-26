"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LoadingSpinner } from "@/common/components/LoadingSpinner";

function isModifiedEvent(e) {
  return e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
}

function shouldTriggerForAnchor(anchor) {
  if (!anchor) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;
  const href = anchor.getAttribute("href");
  if (!href) return false;
  if (href.startsWith("#")) return false;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  return true;
}

export default function RouteClickSpinner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);

  // Hide spinner as soon as URL changes (navigation started/completed)
  useEffect(() => {
    setActive(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const onClickCapture = (e) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return; // left click only
      if (isModifiedEvent(e)) return;

      const anchor = e.target?.closest?.("a");
      if (!shouldTriggerForAnchor(anchor)) return;

      const href = anchor.getAttribute("href");
      // Only for same-origin internal navigation
      if (href.startsWith("http://") || href.startsWith("https://")) {
        try {
          const url = new URL(href, window.location.href);
          if (url.origin !== window.location.origin) return;
        } catch {
          return;
        }
      }

      setActive(true);
    };

    const onRouteLoadingStart = () => setActive(true);
    const onRouteLoadingEnd = () => setActive(false);

    document.addEventListener("click", onClickCapture, true);
    window.addEventListener("route-loading-start", onRouteLoadingStart);
    window.addEventListener("route-loading-end", onRouteLoadingEnd);

    return () => {
      document.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("route-loading-start", onRouteLoadingStart);
      window.removeEventListener("route-loading-end", onRouteLoadingEnd);
    };
  }, []);

  if (!active) return null;
  return <LoadingSpinner />;
}

