import { CONTACT } from "../constants/brand";
import { Hexagon } from "./Shared";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      <div
        className="absolute inset-0 bg-honeycomb bg-repeat opacity-60 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-28 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-brown/70 mb-5">
            From Hive to Healing
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.08] text-brown font-semibold">
            Madu Hutan Murni,
            <br />
            Dari Hutan ke Penyembuhan
          </h1>
          <p className="font-body text-base md:text-lg text-brown-deep/85 mt-6 max-w-md leading-relaxed">
            Elvara menghadirkan madu hutan eukaliptus asli Nusa Tenggara
            Timur. dipanen dengan cara tradisional, tanpa campuran apa pun,
            untuk mendukung kesehatan pencernaan Anda secara alami.
          </p>
          <div className="flex flex-wrap gap-4 mt-9">
            <a
              href={CONTACT.shopeeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-full bg-brown text-cream font-body text-sm tracking-wide hover:bg-brown-deep transition-colors"
            >
              Belanja di Shopee
            </a>
            <a
              href="#sourcing"
              className="inline-flex items-center px-7 py-3.5 rounded-full border border-brown/40 text-brown font-body text-sm tracking-wide hover:border-brown transition-colors"
            >
              Kenali Sumbernya
            </a>
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
