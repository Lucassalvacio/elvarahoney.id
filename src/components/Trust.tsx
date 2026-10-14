import nkvImage from "../assets/nkv-transparent.png";
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
              style={{ ...HEX_CLIP, background: "#D9A441" }}
            >
              <span className="text-brown font-display font-bold text-xs text-center leading-tight">
                NKV
              </span>
            </div>
            <h3 className="font-display text-xl text-brown font-semibold mb-2">
              Nomor Kontrol Veteriner
            </h3>
            <p className="font-body text-brown-deep/80 leading-relaxed text-sm">
              NKV untuk usaha penanganan atau pengolahan madu:{" "}
              <strong>UPM-360328-0008</strong>.
            </p>
            <figure className="mt-5 overflow-hidden rounded-xl border border-brown/15 p-2">
              <img
                src={nkvImage}
                alt="Sertifikat Nomor Kontrol Veteriner Elvara, UPM-360328-0008"
                loading="lazy"
                className="mx-auto block h-auto max-h-64 max-w-full w-auto object-contain"
              />
            </figure>
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
              Nomor sertifikat: <strong>SIG.LHP.IX.2025.181732511</strong>.
              Kadar air tercatat <strong>21,97%</strong> dengan metode AOAC
              969.38B, 2005. Hasil lain yang tersedia melaporkan Coliform 0,
              TPC 0, serta khamir dan kapang negatif.
            </p>
            <p className="font-body text-brown-deep/50 leading-relaxed text-xs mt-3 italic">
              Hasil ini terbatas pada parameter yang disebutkan dan bukan
              klaim manfaat kesehatan.
            </p>
            <a
              href="https://github.com/user-attachments/assets/b349e214-5111-4bfb-9e56-b709c5357a32"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 font-body text-sm underline underline-offset-4"
            >
              Lihat cuplikan hasil uji
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
