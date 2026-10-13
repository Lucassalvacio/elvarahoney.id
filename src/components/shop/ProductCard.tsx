import { useState } from "react";
import type { Product, ProductVariant } from "../../types/product";
import { formatIDR } from "../../lib/format";
import { useCart } from "../../context/CartContext";
import { ProductModal } from "./ProductModal";
import { CONTACT } from "../../constants/brand";
import { IS_TEST_SITE } from "../../constants/siteMode";

export function ProductCard({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [modalOpen, setModalOpen] = useState(false);
  const { addItem } = useCart();

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const outOfStock = !variant || variant.stock <= 0;

  function handleAddToCart(v: ProductVariant) {
    addItem(product.id, v.id, 1);
  }

  const whatsappHref = variant
    ? `${CONTACT.whatsappHref}?text=${encodeURIComponent(
        `Halo Elvara, saya ingin bertanya/memesan:\n${product.name} (${variant.label}) x1 — ${formatIDR(variant.price)}`
      )}`
    : CONTACT.whatsappHref;

  return (
    <>
      <article className="bg-cream-light border border-brown/15 rounded-2xl overflow-hidden flex flex-col hover:border-brown/40 transition-colors">
        <div className="h-52 relative bg-cream-dark">
          <img
            src={product.image}
            alt={`Ilustrasi ${product.name}; foto produk aktual belum tersedia.`}
            loading="lazy"
            className="w-full h-full object-contain"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-gold text-brown text-xs font-body font-semibold tracking-wide px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="mb-1">
            <h2 className="font-display text-lg text-brown font-semibold">
              {product.name}
            </h2>
          </div>
          <p className="font-body text-brown-deep/70 text-sm mb-4">
            {product.shortDescription}
          </p>

          {product.variants.length > 1 && (
            <div className="mb-4">
              <p className="mb-2 font-body text-xs font-medium text-brown-deep/70">
                Pilih ukuran
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    disabled={v.stock <= 0}
                    aria-pressed={v.id === variantId}
                    aria-label={`${v.label}, ${formatIDR(v.price)}`}
                    className={`font-body text-xs tracking-wide px-3 py-1.5 rounded-full border transition-colors ${
                      v.id === variantId
                        ? "bg-brown text-cream border-brown"
                        : "border-brown/30 text-brown hover:border-brown"
                    } ${v.stock <= 0 ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    {v.label} · {formatIDR(v.price)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {variant && (
            <p className="mb-4 font-body text-sm text-brown-deep/70">
              {product.variants.length > 1 ? `Harga ${variant.label}` : "Harga"}
              <span className="ml-2 font-display text-lg font-semibold text-brown">
                {formatIDR(variant.price)}
              </span>
            </p>
          )}

          {product.contents && (
            <ul className="mb-5 space-y-1">
              {product.contents.map((item) => (
                <li
                  key={item}
                  className="font-body text-xs leading-relaxed text-brown-deep/75"
                >
                  • {item}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex flex-col gap-2 pt-2">
            {IS_TEST_SITE ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={outOfStock}
                onClick={(event) => outOfStock && event.preventDefault()}
                className={`inline-flex w-full items-center justify-center rounded-full bg-brown px-5 py-2.5 text-sm tracking-wide text-cream transition-colors hover:bg-brown-deep ${
                  outOfStock ? "pointer-events-none opacity-40" : ""
                }`}
              >
                Pesan via WhatsApp
              </a>
            ) : (
              <button
                type="button"
                disabled={outOfStock}
                onClick={() => variant && handleAddToCart(variant)}
                className="inline-flex w-full items-center justify-center rounded-full bg-brown px-5 py-2.5 text-sm tracking-wide text-cream transition-colors hover:bg-brown-deep disabled:cursor-not-allowed disabled:opacity-40"
              >
                + Keranjang
              </button>
            )}
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex w-full items-center justify-center rounded-full border border-brown/30 px-5 py-2.5 font-body text-sm tracking-wide text-brown transition-colors hover:border-brown"
            >
              Lihat detail
            </button>
          </div>
        </div>
      </article>

      {modalOpen && (
        <ProductModal
          product={product}
          variantId={variantId}
          onSelectVariant={setVariantId}
          onClose={() => setModalOpen(false)}
          onAddToCart={(v) => handleAddToCart(v)}
        />
      )}
    </>
  );
}