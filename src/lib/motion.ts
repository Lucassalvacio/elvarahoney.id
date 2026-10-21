// Motion tokens (TS mirror of the CSS custom properties in index.css).
export const MOTION = {
  duration: { fast: 160, base: 400, slow: 700 },
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  distance: { sm: 12, md: 18, lg: 24 },
  stagger: 90,
  magneticMax: 6,
} as const;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function hasFinePointer(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}
