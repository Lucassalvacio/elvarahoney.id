import { Link } from "react-router-dom";
import { CONTACT } from "../constants/brand";
import { Hexagon } from "./Shared";
import { HoneycombDraw, KineticHeading, Magnetic } from "./Motion";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      <HoneycombDraw className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-28 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-brown/70 mb-5">
            From Hive to Healing
          </p>
          <KineticHeading
            className="font-display text-4xl md:text-6xl leading-[1.08] text-brown font-semibold"
            lines={["Madu Hutan Eukaliptus,", "Asal Nusa Tenggara Timur"]}
          />
          <p className="font-body text-base md:text-lg text-brown-deep/85 mt-6 max-w-md leading-relaxed">
            Elvara menghadirkan madu hutan eukaliptus mentah dari Nusa Tenggara
            Timur, tanpa pemanasan, bahan tambahan, atau pencampuran.
          </p>
          <div className="flex flex-wrap gap-4 mt-9">
            <Magnetic>
            <a
              href={CONTACT.shopeeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center px-7 py-3.5 rounded-full bg-brown text-cream font-body text-sm tracking-wide hover:bg-brown-deep"
            >
              Belanja di Shopee <span aria-hidden="true" className="btn-arrow ml-2">→</span>
            </a>
            </Magnetic>
            <Link
              to="/sumber-madu"
              className="btn inline-flex items-center px-7 py-3.5 rounded-full border border-brown/40 text-brown font-body text-sm tracking-wide hover:border-brown"
            >
              Kenali Sumbernya
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-64 h-64 md:w-96 md:h-96">
          <div className="absolute -inset-4 md:-inset-6 border border-brown/25 rounded-full" />
          <Hexagon className="w-full h-full " />
        </div>
      </div>
    </section>
  );
}
