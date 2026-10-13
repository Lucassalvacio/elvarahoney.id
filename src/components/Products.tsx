import { CONTACT } from "../constants/brand";
import { Eyebrow } from "./Shared";
import { PRODUCTS } from "../data/products";
import { formatIDR } from "../lib/format";

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
            Madu hutan tanpa pemanasan, bahan tambahan, atau pencampuran.
            Lihat ukuran, isi paket, dan harga sebelum memilih kanal pembelian.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="bg-cream-light border border-brown/15 rounded-2xl p-6"
            >
              <h3 className="font-display text-2xl text-brown font-semibold mb-2">
                {product.name}
              </h3>
              <p className="font-body text-brown-deep/80 text-sm mb-5">
                {product.shortDescription}
              </p>
              {product.contents && (
                <ul className="space-y-1 mb-5">
                  {product.contents.map((item) => (
                    <li
                      key={item}
                      className="font-body text-sm text-brown-deep/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              <ul className="space-y-2 border-t border-brown/10 pt-4">
                {product.variants.map((variant) => (
                  <li
                    key={variant.id}
                    className="flex justify-between gap-3 font-body text-sm"
                  >
                    <span className="text-brown">{variant.label}</span>
                    <span className="font-semibold text-brown">
                      {formatIDR(variant.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
          <a
            href={CONTACT.shopeeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3.5 rounded-full border border-brown/40 text-brown font-body text-sm tracking-wide hover:border-brown transition-colors"
          >
            Belanja di Shopee →
          </a>
          <a
            href={`${CONTACT.whatsappHref}?text=${encodeURIComponent("Halo Elvara, saya ingin bertanya tentang produk dan harga.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-brown text-cream font-body text-sm tracking-wide hover:bg-brown-deep transition-colors"
          >
            Tanya via WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
