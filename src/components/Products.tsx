import { CONTACT } from "../constants/brand";
import { Eyebrow } from "./Shared";
import placeholderImg from "../assets/placeholder-product.svg";

const BOTTLES = ["125gr", "250gr", "500gr"];
const HAMPERS = [
  { name: "Daily Ritual", note: "Untuk kebiasaan sehat harian" },
  { name: "Tea Ritual", note: "Madu, dipasangkan dengan teh pilihan" },
  {
    name: "Heritage Duo",
    note: "2× botol 700gr + sendok kayu — hadiah istimewa",
  },
];

export function Products() {
  return (
    <section id="koleksi" className="bg-cream">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-xl mb-14">
          <Eyebrow>Koleksi Elvara</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl text-brown font-semibold mb-4">
            Untuk Sehari-hari, Untuk Sesekali Istimewa
          </h2>
          <p className="font-body text-brown-deep/80 leading-relaxed">
            Semua produk Elvara tersedia eksklusif melalui Shopee — kami
            menjaga kualitas dengan tidak menyebar ke banyak kanal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-cream-light border border-brown/15 rounded-2xl overflow-hidden">
            <div className="h-56">
              <img
                src={placeholderImg}
                alt="Ez Squeeze Bottle — foto produk placeholder"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="font-display text-2xl text-brown font-semibold mb-2">
                Ez Squeeze Bottle
              </h3>
              <p className="font-body text-brown-deep/80 text-sm mb-4">
                Madu murni harian, dalam genggaman.
              </p>
              <div className="flex gap-2">
                {BOTTLES.map((size) => (
                  <span
                    key={size}
                    className="font-body text-xs tracking-wide px-3 py-1.5 rounded-full border border-brown/30 text-brown"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-cream-light border border-brown/15 rounded-2xl overflow-hidden">
            <div className="h-56">
              <img
                src={placeholderImg}
                alt="Hampers Elvara — foto produk placeholder"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="font-display text-2xl text-brown font-semibold mb-4">
                Hampers
              </h3>
              <ul className="space-y-3">
                {HAMPERS.map((h) => (
                  <li key={h.name} className="flex justify-between gap-4">
                    <span className="font-body text-sm text-brown font-medium">
                      {h.name}
                    </span>
                    <span className="font-body text-xs text-brown-deep/60 text-right">
                      {h.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href={CONTACT.shopeeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-brown text-cream font-body text-sm tracking-wide hover:bg-brown-deep transition-colors"
          >
            Belanja di Shopee →
          </a>
        </div>
      </div>
    </section>
  );
}
