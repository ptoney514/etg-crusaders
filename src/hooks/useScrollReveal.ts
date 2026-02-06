import { useEffect, useRef } from "react";

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            // Stagger children if they have data-reveal-delay
            const children = entry.target.querySelectorAll("[data-reveal-delay]");
            children.forEach((child) => {
              const delay = child.getAttribute("data-reveal-delay") || "0";
              (child as HTMLElement).style.transitionDelay = `${delay}ms`;
              child.classList.add("revealed");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
