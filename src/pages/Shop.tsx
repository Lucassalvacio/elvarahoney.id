import { useState } from "react";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/shop/ProductCard";
import { Eyebrow } from "../components/Shared";
import type { ProductCategory } from "../types/product";

const FILTERS: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "bottle", label: "Botol" },
  { id: "hamper", label: "Hampers" },
];

export function Shop() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");

  const products =
    filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <section className="bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-xl mb-10">
          <Eyebrow>Toko Elvara</Eyebrow>
          <h1 className="font-display text-3xl md:text-4xl text-brown font-semibold mb-4">
            Semua Produk
          </h1>
          <p className="font-body text-brown-deep/80 leading-relaxed">
            Pilih produk, tentukan varian, lalu tambahkan ke keranjang.
          </p>
        </div>

        <div className="flex gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`font-body text-sm tracking-wide px-5 py-2 rounded-full border transition-colors ${
                filter === f.id
                  ? "bg-brown text-cream border-brown"
                  : "border-brown/30 text-brown hover:border-brown"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
