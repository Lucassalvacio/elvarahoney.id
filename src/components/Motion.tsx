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

/**
 * Decorative looping honeycomb. Uses the site's hexagon tile (56x100 tile, same path), full-bleed behind content.
 * Each cell draws, holds, then fades out on a diagonal stagger, forever.
 */
const HEX_PATH = "M28 0 L56 16 L56 50 L28 66 L0 50 L0 16 Z";
const COLS = 14;
const ROWS = 8;

export function HoneycombDraw({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);

  // Cursor interaction: a brighter copy of the grid is revealed through a
  // radial mask that follows the mouse. One CSS-variable write per frame.
  useEffect(() => {
    const el = wrap.current;
    if (!el || prefersReducedMotion() || !hasFinePointer()) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      el.setAttribute("data-active", "true");
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => el.removeAttribute("data-active");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const build = (highlight: boolean) => {
    const cells = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const gold = (r + c) % 4 === 0;
        cells.push(
          <path
            key={`${r}-${c}`}
            d={HEX_PATH}
            transform={`translate(${c * 56} ${r * 100})`}
            pathLength={1}
            style={
              highlight
                ? undefined
                : { animationDelay: `${((r + c) * 0.35).toFixed(2)}s` }
            }
            stroke={gold ? "#D9A441" : "#592A0D"}
            strokeOpacity={highlight ? (gold ? 0.9 : 0.5) : gold ? 0.4 : 0.2}
            strokeWidth={highlight ? 1.5 : 1}
          />
        );
      }
    }
    return cells;
  };

  const svgProps = {
    "aria-hidden": true,
    focusable: false,
    viewBox: `0 0 ${COLS * 56} ${ROWS * 100}`,
    preserveAspectRatio: "xMidYMid slice",
    fill: "none",
    className: "absolute inset-0 h-full w-full",
  } as const;

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className={`honeycomb-wrap ${className}`}
    >
      <svg {...svgProps} className="honeycomb-draw absolute inset-0 h-full w-full">
        {build(false)}
      </svg>
      <svg {...svgProps} className="honeycomb-glow absolute inset-0 h-full w-full">
        {build(true)}
      </svg>
    </div>
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
