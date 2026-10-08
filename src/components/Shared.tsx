import placeholderImg from "../assets/placeholder-product.svg";

export function Hexagon({ className = "" }: { className?: string }) {
  return (
    <div
      className={`aspect-[1.1547/1] ${className}`}
      style={{
        clipPath:
          "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
        overflow: "hidden",
      }}
    >
      <img
        src={placeholderImg}
        alt="Madu Elvara — foto produk placeholder"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-xs md:text-sm tracking-[0.25em] uppercase text-gold font-semibold mb-3">
      {children}
    </p>
  );
}

export function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2" aria-hidden="true">
      <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
        <path
          d="M14 0 L27 7 V17 L14 24 L1 17 V7 Z"
          stroke="#592A0D"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 pt-14 md:pt-20 text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl font-semibold text-brown">
        {title}
      </h1>
    </div>
  );
}

// Template block: replace the text with real content when available.
export function TemplateNote({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-cream">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-14">
        <div className="border border-dashed border-brown/30 rounded-2xl p-8">
          <h2 className="font-display text-2xl font-semibold text-brown mb-3">
            {title}
          </h2>
          <p className="font-body text-brown-deep/80 leading-relaxed">
            {children}
          </p>
        </div>
      </div>
    </section>
  );
}
