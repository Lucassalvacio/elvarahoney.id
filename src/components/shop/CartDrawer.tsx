import { Link } from "react-router-dom";
import { useCart, useCartDetails } from "../../context/CartContext";
import { formatIDR } from "../../lib/format";

export function CartDrawer() {
  const { isCartOpen, closeCart, setQty, removeItem, subtotal } = useCart();
  const { detailed } = useCartDetails();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-brown-deep/40"
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside className="absolute right-0 top-0 h-full w-full max-w-sm bg-cream shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 h-20 border-b border-brown/10">
          <h2 className="font-display text-xl text-brown font-semibold">
            Keranjang
          </h2>
          <button
            onClick={closeCart}
            aria-label="Tutup keranjang"
            className="text-brown"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="themed-scrollbar flex-1 overflow-y-auto px-6 py-5">
          {detailed.length === 0 ? (
            <p className="font-body text-brown-deep/60 text-sm mt-8 text-center">
              Keranjang masih kosong.
            </p>
          ) : (
            <div className="space-y-5">
              {detailed.map(({ line, product, variant }) => (
                <div key={`${line.productId}-${line.variantId}`} className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-brown/10"
                  />
                  <div className="flex-1">
                    <p className="font-body text-sm text-brown font-medium">
                      {product.name}
                    </p>
                    <p className="font-body text-xs text-brown-deep/60 mb-2">
                      {variant.label}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-brown/20 rounded-full">
                        <button
                          className="w-7 h-7 flex items-center justify-center text-brown"
                          onClick={() =>
                            setQty(line.productId, line.variantId, line.qty - 1)
                          }
                          aria-label="Kurangi jumlah"
                        >
                          −
                        </button>
                        <span className="font-body text-sm w-6 text-center">
                          {line.qty}
                        </span>
                        <button
                          className="w-7 h-7 flex items-center justify-center text-brown"
                          onClick={() =>
                            setQty(line.productId, line.variantId, line.qty + 1)
                          }
                          aria-label="Tambah jumlah"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-body text-sm text-brown font-semibold">
                        {formatIDR(variant.price * line.qty)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(line.productId, line.variantId)}
                    aria-label={`Hapus ${product.name} dari keranjang`}
                    className="text-brown-deep/40 hover:text-brown-deep self-start"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 6l12 12M18 6L6 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {detailed.length > 0 && (
          <div className="border-t border-brown/10 px-6 py-5">
            <div className="flex justify-between mb-4">
              <span className="font-body text-sm text-brown-deep/70">
                Subtotal
              </span>
              <span className="font-display text-lg text-brown font-semibold">
                {formatIDR(subtotal)}
              </span>
            </div>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-brown text-cream font-body text-sm tracking-wide hover:bg-brown-deep transition-colors"
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
