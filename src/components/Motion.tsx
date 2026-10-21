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
const VB = 800;
const R = 32; // hexagon radius
const HEX_W = Math.sqrt(3) * R;

// Regular hexagon (pointy-top) centred on the origin.
const HEX_PATH =
  "M" +
  [0, 1, 2, 3, 4, 5]
    .map((k) => {
      const a = (Math.PI / 3) * k - Math.PI / 2;
      return `${(R * Math.cos(a)).toFixed(2)} ${(R * Math.sin(a)).toFixed(2)}`;
    })
    .join("L") +
  "Z";

// Three honeycomb "domains": each is a properly tessellated grid, rotated
// differently, so the comb runs in different directions across the hero.
const DOMAINS = [
  { angle: 0, points: "0,0 460,0 300,800 0,800" },
  { angle: 20, points: "460,0 800,0 800,430 560,430 300,800" },
  { angle: -15, points: "800,430 800,800 300,800 560,430" },
];

function domainCells(angle: number) {
  const cells: { x: number; y: number }[] = [];
  const span = VB * 0.85; // enough margin to cover the area after rotation
  const rowH = 1.5 * R;
  for (let r = -Math.ceil(span / rowH); r <= Math.ceil((VB + span) / rowH); r++) {
    const off = r % 2 ? HEX_W / 2 : 0;
    for (let x = -span + off; x <= VB + span; x += HEX_W) {
      const rad = (angle * Math.PI) / 180;
      const dx = x - VB / 2;
      const dy = r * rowH - VB / 2;
      const rx = VB / 2 + dx * Math.cos(rad) - dy * Math.sin(rad);
      const ry = VB / 2 + dx * Math.sin(rad) + dy * Math.cos(rad);
      if (rx > -R && rx < VB + R && ry > -R && ry < VB + R)
        cells.push({ x: x, y: r * rowH });
    }
  }
  return cells;
}

const DOMAIN_CELLS = DOMAINS.map((d) => domainCells(d.angle));

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

  const build = (highlight: boolean) =>
    DOMAINS.map((d, di) => {
      const clipId = `hc-clip-${highlight ? "g" : "b"}-${di}`;
      return (
        <g key={di}>
          <clipPath id={clipId}>
            <polygon points={d.points} />
          </clipPath>
          <g clipPath={`url(#${clipId})`}>
            <g transform={`rotate(${d.angle} ${VB / 2} ${VB / 2})`}>
              {DOMAIN_CELLS[di].map((c, i) => {
                const gold = i % 4 === 0;
                return (
                  <path
                    key={i}
                    d={HEX_PATH}
                    transform={`translate(${c.x.toFixed(1)} ${c.y.toFixed(1)})`}
                    pathLength={1}
                    style={
                      highlight
                        ? undefined
                        : {
                            animationDelay: `${(((c.x + c.y + VB) / 120) % 9).toFixed(2)}s`,
                          }
                    }
                    stroke={gold ? "#D9A441" : "#592A0D"}
                    strokeOpacity={highlight ? (gold ? 0.9 : 0.5) : gold ? 0.3 : 0.15}
                    strokeWidth={highlight ? 1.5 : 0.8}
                  />
                );
              })}
            </g>
          </g>
        </g>
      );
    });

  const svgProps = {
    "aria-hidden": true,
    focusable: false,
    viewBox: `0 0 ${VB} ${VB}`,
    preserveAspectRatio: "xMidYMid slice",
    fill: "none",
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
