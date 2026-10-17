import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";
import { MOTION, hasFinePointer, prefersReducedMotion } from "../lib/motion";

/**
 * One-time scroll reveal. Content is visible by default (no-JS safe): the
 * hidden state only applies under `html.js-motion`, set once JS has run.
 */
export function Reveal({
  children,
  as,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      el.setAttribute("data-revealed", "true");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-revealed", "true");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/** Heading animated line by line; text stays real, selectable text. */
export function KineticHeading({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <h1 className={className}>
      {lines.map((line, i) => (
        <span
          key={line}
          className="kinetic-line"
          style={{ animationDelay: `${i * MOTION.stagger * 2}ms` }}
        >
          {line}
        </span>
      ))}
    </h1>
  );
}

/** Subtle magnetic pull toward the pointer; fine pointers only. */
export function Magnetic({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !hasFinePointer() || prefersReducedMotion())
      return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `translate3d(${dx * MOTION.magneticMax}px, ${dy * MOTION.magneticMax}px, 0)`;
    });
  };
  const reset = () => {
    cancelAnimationFrame(frame.current);
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      className={`magnetic inline-block ${className}`}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </span>
  );
}

/** Reading progress for a given article container; updated via rAF, no React state. */
export function ReadingProgress({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement>;
}) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = targetRef.current;
      if (!el || !bar.current) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : r.top < 0 ? 1 : 0;
      bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [targetRef]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-[3px] bg-brown/10"
    >
      <div
        ref={bar}
        className="h-full origin-left bg-gold"
        style={{ transform: "scaleX(0)", willChange: "transform" }}
      />
    </div>
  );
}

/** Decorative honeycomb outline that draws itself (stroke-dash). */
export function HoneycombDraw({ className = "" }: { className?: string }) {
  const hex = (cx: number, cy: number) => {
    const r = 30;
    const pts = [0, 1, 2, 3, 4, 5].map((k) => {
      const a = (Math.PI / 3) * k + Math.PI / 6;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    });
    return `M${pts.join("L")}Z`;
  };
  const cells = [
    [60, 60], [112, 90], [60, 120], [112, 30], [164, 60], [164, 120],
  ];
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 224 150"
      className={`honeycomb-draw ${className}`}
      fill="none"
    >
      {cells.map(([x, y], i) => (
        <path
          key={i}
          d={hex(x, y)}
          pathLength={1}
          style={{ animationDelay: `${i * MOTION.stagger * 3}ms` }}
          stroke={i % 3 === 0 ? "#D9A441" : "#592A0D"}
          strokeOpacity={i % 3 === 0 ? 0.55 : 0.3}
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}

/** Slow, low-count botanical line art for empty backgrounds. */
export function BotanicalSway({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 120 200"
      fill="none"
      className={`botanical-sway pointer-events-none ${className}`}
    >
      <path d="M60 198 C58 140 66 90 60 10" stroke="currentColor" strokeWidth="1.2" />
      {[40, 75, 110, 145].map((y, i) => (
        <path
          key={y}
          d={
            i % 2
              ? `M60 ${y + 10} C85 ${y} 100 ${y - 14} 106 ${y - 30} C84 ${y - 26} 66 ${y - 10} 60 ${y + 10}`
              : `M60 ${y + 10} C35 ${y} 20 ${y - 14} 14 ${y - 30} C36 ${y - 26} 54 ${y - 10} 60 ${y + 10}`
          }
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

export function useScrolledPast(offset: number): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      setPast(window.scrollY > offset); // bails out unless the boolean changes
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [offset]);
  return past;
}
