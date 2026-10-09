import { useState } from "react";
import type { Product, ProductVariant } from "../../types/product";
import { formatIDR } from "../../lib/format";
import { useCart } from "../../context/CartContext";
import { ProductModal } from "./ProductModal";

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

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setModalOpen(true);
        }}
        className="bg-cream-light border border-brown/15 rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:border-brown/40 transition-colors"
      >
        <div className="h-52 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-gold text-brown text-xs font-body font-semibold tracking-wide px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display text-lg text-brown font-semibold mb-1">
            {product.name}
          </h3>
          <p className="font-body text-brown-deep/70 text-sm mb-4">
            {product.shortDescription}
          </p>

          {product.variants.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setVariantId(v.id);
                  }}
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
          )}

          <div className="mt-auto flex items-center justify-between gap-3 pt-2">
            <div>
              <p className="font-display text-lg text-brown font-semibold">
                {variant ? formatIDR(variant.price) : "—"}
              </p>
              {outOfStock && (
                <p className="font-body text-xs text-brown-deep/50">Habis</p>
              )}
            </div>
            <button
              type="button"
              disabled={outOfStock}
              onClick={(e) => {
                e.stopPropagation();
                if (variant) handleAddToCart(variant);
              }}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-brown text-cream font-body text-sm tracking-wide hover:bg-brown-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-brown"
            >
              + Keranjang
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <ProductModal
          product={product}
          variantId={variantId}
          onSelectVariant={setVariantId}
          onClose={() => setModalOpen(false)}
          onAddToCart={(v) => {
            handleAddToCart(v);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}