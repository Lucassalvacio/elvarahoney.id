import type { Product, ProductVariant } from "../../types/product";
import { formatIDR } from "../../lib/format";
import {
  HONEY_CHARACTERISTICS,
  STORAGE_NOTES,
  SHIPPING_SCHEDULE,
  RETURN_POLICY,
} from "../../data/productInfo";

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-5">
      <h4 className="font-body text-xs tracking-[0.2em] uppercase text-gold font-semibold mb-2">
        {title}
      </h4>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="font-body text-sm text-brown-deep/80 leading-relaxed flex gap-2"
          >
            <span className="text-brown/40 shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductModal({
  product,
  variantId,
  onSelectVariant,
  onClose,
  onAddToCart,
}: {
  product: Product;
  variantId: string;
  onSelectVariant: (id: string) => void;
  onClose: () => void;
  onAddToCart: (variant: ProductVariant) => void;
}) {
  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const outOfStock = !variant || variant.stock <= 0;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-brown-deep/50"
        onClick={onClose}
        aria-hidden="true"
      />
       <div className="themed-scrollbar relative bg-cream rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-10 h-0 pointer-events-none">
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="pointer-events-auto absolute top-4 right-4 w-9 h-9 rounded-full bg-cream/90 border border-brown/15 flex items-center justify-center text-brown"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="h-64 md:h-72 rounded-t-2xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-1">
            <h2 className="font-display text-2xl text-brown font-semibold">
              {product.name}
            </h2>
            {product.badge && (
              <span className="bg-gold text-brown text-xs font-body font-semibold tracking-wide px-3 py-1 rounded-full whitespace-nowrap">
                {product.badge}
              </span>
            )}
          </div>
          <p className="font-body text-brown-deep/70 text-sm mb-5">
            {product.shortDescription}
          </p>

          {product.description && (
            <p className="font-body text-sm text-brown-deep/80 leading-relaxed mb-5">
              {product.description}
            </p>
          )}

          {product.contents && (
            <InfoList title="Isi Paket" items={product.contents} />
          )}

          {product.variants.length > 1 && (
            <div className="mb-5">
              <h4 className="font-body text-xs tracking-[0.2em] uppercase text-gold font-semibold mb-2">
                Pilih Varian
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => onSelectVariant(v.id)}
                    disabled={v.stock <= 0}
                    className={`font-body text-xs tracking-wide px-3 py-1.5 rounded-full border transition-colors ${
                      v.id === variantId
                        ? "bg-brown text-cream border-brown"
                        : "border-brown/30 text-brown hover:border-brown"
                    } ${v.stock <= 0 ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {variant?.packageDimensionsCm && (
            <p className="font-body text-xs text-brown-deep/50 mb-5">
              Ukuran paket: {variant.packageDimensionsCm.length}×
              {variant.packageDimensionsCm.width}×
              {variant.packageDimensionsCm.height} cm · Berat{" "}
              {variant.weightGrams}gr
            </p>
          )}

          <InfoList title="Tentang Madu Hutan" items={HONEY_CHARACTERISTICS} />
          <InfoList title="Cara Penyimpanan" items={STORAGE_NOTES} />
          <InfoList title="Jadwal Pengiriman" items={SHIPPING_SCHEDULE} />
          <InfoList title="Pengembalian & Penukaran" items={RETURN_POLICY} />

          <div className="flex items-center justify-between gap-4 pt-4 mt-2 border-t border-brown/10">
            <div>
              <p className="font-display text-xl text-brown font-semibold">
                {variant ? formatIDR(variant.price) : "—"}
              </p>
              {outOfStock && (
                <p className="font-body text-xs text-brown-deep/50">Habis</p>
              )}
            </div>
            <button
              type="button"
              disabled={outOfStock}
              onClick={() => variant && onAddToCart(variant)}
              className="inline-flex items-center px-6 py-3 rounded-full bg-brown text-cream font-body text-sm tracking-wide hover:bg-brown-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-brown"
            >
              + Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}