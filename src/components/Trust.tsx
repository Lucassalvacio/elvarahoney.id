import { Eyebrow } from "./Shared";

const HEX_CLIP = {
  clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
};

export function Trust() {
  return (
    <section id="kepercayaan" className="bg-cream">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-xl mb-14">
          <Eyebrow>Transparansi</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl text-brown font-semibold">
            Kepercayaan yang Bisa Dibuktikan
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-cream-light border border-brown/15 rounded-2xl p-8">
            <div
              className="w-16 aspect-[1.1547/1] mb-5 flex items-center justify-center"
              style={{ ...HEX_CLIP, background: "#592A0D" }}
            >
              <span className="text-cream font-display font-bold text-sm">
                NKV
              </span>
            </div>
            <h3 className="font-display text-xl text-brown font-semibold mb-2">
              Nomor Kontrol Veteriner
            </h3>
            <p className="font-body text-brown-deep/80 leading-relaxed text-sm">
              Elvara memiliki sertifikat NKV. Rincian nomor dan ruang lingkup
              sertifikat tidak dicantumkan di halaman ini.
            </p>
          </div>

          <div className="bg-cream-light border border-brown/15 rounded-2xl p-8">
            <div
              className="w-16 aspect-[1.1547/1] mb-5 flex items-center justify-center"
              style={{ ...HEX_CLIP, background: "#D9A441" }}
            >
              <span className="text-brown font-display font-bold text-xs text-center leading-tight">
                Uji
                <br />
                Lab
              </span>
            </div>
            <h3 className="font-display text-xl text-brown font-semibold mb-2">
              Hasil Uji Laboratorium
            </h3>
            <p className="font-body text-brown-deep/80 leading-relaxed text-sm">
              Hasil pengujian yang tersedia melaporkan Coliform 0, TPC 0, serta
              hasil negatif untuk khamir dan kapang.
            </p>
            <p className="font-body text-brown-deep/50 leading-relaxed text-xs mt-3 italic">
              Rincian tanggal pengujian dan identitas laboratorium belum
              dicantumkan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
