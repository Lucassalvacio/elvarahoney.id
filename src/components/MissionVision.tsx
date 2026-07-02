import { Eyebrow } from "./Shared";

const PILLARS = [
  {
    title: "Kemurnian",
    body: "Menyajikan madu hutan 100% murni tanpa bahan dan pengolahan tambahan.",
  },
  {
    title: "Kesehatan",
    body: "Mendorong masyarakat untuk menjaga kesehatan pencernaan secara alami.",
  },
  {
    title: "Transparansi",
    body: "Menjaga transparansi dalam sumber, pengemasan, dan pengendalian kualitas untuk menjaga kepercayaan konsumen.",
  },
];

export function MissionVision() {
  return (
    <section id="misi-visi" className="bg-cream">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-5 gap-14">
          {/* Mission */}
          <div className="md:col-span-3">
            <Eyebrow>Misi Kami</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl text-brown font-semibold mb-10">
              Komitmen di Setiap Tetes
            </h2>
            <div className="space-y-8">
              {PILLARS.map((p) => (
                <div key={p.title} className="flex gap-5">
                  <span
                    className="mt-1 shrink-0 w-2.5 h-2.5 rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-xl text-brown font-semibold mb-1.5">
                      {p.title}
                    </h3>
                    <p className="font-body text-brown-deep/80 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className="md:col-span-2 bg-brown text-cream rounded-2xl p-9 md:p-10 flex flex-col justify-center">
            <Eyebrow>
              <span className="text-gold-light">Visi Kami</span>
            </Eyebrow>
            <p className="font-display text-2xl md:text-[1.7rem] leading-snug italic">
              &ldquo;Menjadi sumber madu murni premium terpercaya di
              Indonesia yang menginspirasi gaya hidup sehat dan mendukung
              petani lokal.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
