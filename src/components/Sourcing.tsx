import { Eyebrow, Hexagon } from "./Shared";

export function Sourcing() {
  return (
    <section id="sourcing" className="bg-forest text-cream">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-14 items-center">
        <div className="order-2 md:order-1">
          <Eyebrow>Dari Hutan NTT</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 leading-tight">
            Dipanen dengan Hormat,
            <br /> Bukan Diserobot
          </h2>
          <p className="font-body text-cream/85 leading-relaxed mb-5">
            Elvara bermitra dengan komunitas lokal di hutan eukaliptus Nusa
            Tenggara Timur, yang memanen madu dengan metode tradisional
            turun-temurun.
          </p>
          <p className="font-body text-cream/85 leading-relaxed mb-5">
            Setiap panen dilakukan secukupnya. cukup untuk kami, dan cukup
            tersisa agar koloni lebah tetap tumbuh serta hutan tetap lestari.
          </p>
          <p className="font-body text-cream/85 leading-relaxed">
            Mitra petani kami dibayar secara adil, dan sebagian hasil kerja
            sama ini turut mendukung akses pendidikan bagi anak-anak di
            wilayah pedesaan.
          </p>
        </div>
        <div className="order-1 md:order-2 relative mx-auto w-56 h-56 md:w-80 md:h-80">
          <Hexagon className="w-full h-full" />
        </div>
      </div>
    </section>
  );
}
