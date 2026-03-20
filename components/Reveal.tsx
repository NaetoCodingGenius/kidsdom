"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export function Reveal({ children, delay = 0, direction = "up" }: { children: ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none" }) {
  const { ref, visible } = useInView();
  const initial = direction === "up" ? "translateY(32px)" : direction === "left" ? "translateX(-32px)" : direction === "right" ? "translateX(32px)" : "none";
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : initial, transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>
      {children}
    </div>
  );
}
