import { useMemo, useState } from "react";
import { PRODUCTS } from "../../data/products";
import { formatIDR } from "../../lib/format";
import { CONTACT } from "../../constants/brand";

// Structured price list derived from the catalog; only in-stock variants are eligible.
const PRICE_LIST = PRODUCTS.flatMap((p) =>
  p.variants
    .filter((v) => v.stock > 0)
    .map((v) => ({
      id: v.id,
      name: p.variants.length > 1 ? `${p.name} ${v.label}` : p.name,
      price: v.price,
      stock: v.stock,
    }))
);

export function BundleBuilder() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [error, setError] = useState("");

  const lines = useMemo(
    () => PRICE_LIST.filter((i) => (qty[i.id] ?? 0) > 0).map((i) => ({ ...i, qty: qty[i.id] })),
    [qty]
  );
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);

  const change = (id: string, delta: number, max: number) => {
    setError("");
    setQty((q) => ({ ...q, [id]: Math.min(max, Math.max(0, (q[id] ?? 0) + delta)) }));
  };

  const submit = () => {
    if (lines.length === 0) {
      setError("Pilih minimal satu produk.");
      return;
    }
    if (lines.some((l) => l.qty > l.stock)) {
      setError("Jumlah melebihi stok tersedia.");
      return;
    }
    const text = `Halo Elvara, saya ingin menanyakan paket hadiah:\n${lines
      .map((l) => `${l.name} x${l.qty} — ${formatIDR(l.price * l.qty)}`)
      .join("\n")}\nTotal: ${formatIDR(total)}`;
    window.open(`${CONTACT.whatsappHref}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="mt-14 rounded-2xl border border-brown/15 bg-cream-light p-6 md:p-8" aria-labelledby="bundle-heading">
      <h2 id="bundle-heading" className="font-display text-2xl text-brown font-semibold mb-1">
        Susun Paket Hadiah
      </h2>
      <p className="font-body text-sm text-brown-deep/80 mb-5">
        Pilih produk dan jumlah, lalu kirim sebagai pertanyaan via WhatsApp.
      </p>
      <ul className="divide-y divide-brown/10">
        {PRICE_LIST.map((i) => {
          const q = qty[i.id] ?? 0;
          return (
            <li key={i.id} className="flex items-center justify-between gap-3 py-3 font-body text-sm text-brown-deep">
              <span>
                {i.name} <span className="text-brown-deep/60">· {formatIDR(i.price)}</span>
              </span>
              <span className="flex items-center gap-2">
                <button type="button" aria-label={`Kurangi ${i.name}`} disabled={q === 0} onClick={() => change(i.id, -1, i.stock)} className="btn h-9 w-9 rounded-full border border-brown/30 text-brown disabled:opacity-40">−</button>
                <span aria-live="polite" className="w-6 text-center">{q}</span>
                <button type="button" aria-label={`Tambah ${i.name}`} disabled={q >= i.stock} onClick={() => change(i.id, 1, i.stock)} className="btn h-9 w-9 rounded-full border border-brown/30 text-brown disabled:opacity-40">+</button>
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p className="font-display text-xl text-brown font-semibold">Total: {formatIDR(total)}</p>
        <button type="button" onClick={submit} className="btn inline-flex items-center rounded-full bg-brown px-6 py-3 font-body text-sm tracking-wide text-cream hover:bg-brown-deep">
          Tanya via WhatsApp <span aria-hidden="true" className="btn-arrow ml-2">→</span>
        </button>
      </div>
      {error && <p role="alert" className="mt-3 font-body text-sm text-red-800">{error}</p>}
    </section>
  );
}
