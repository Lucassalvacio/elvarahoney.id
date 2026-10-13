import { Link } from "react-router-dom";
import { Hero } from "../components/Hero";
import { SectionDivider } from "../components/Shared";

const HIGHLIGHTS = [
  { to: "/misi-visi", label: "Misi & Visi", text: "Apa yang kami perjuangkan." },
  { to: "/sumber-madu", label: "Sumber Madu", text: "Dari hutan eukaliptus NTT." },
  { to: "/kepercayaan", label: "Kepercayaan", text: "Alasan memilih Elvara." },
  { to: "/koleksi", label: "Koleksi", text: "Lihat produk madu kami." },
];

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pb-16 grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {HIGHLIGHTS.map((h) => (
            <Link
              key={h.to}
              to={h.to}
              className="border border-brown/20 rounded-2xl p-6 hover:border-gold transition-colors"
            >
              <h3 className="font-display text-xl font-semibold text-brown mb-1">
                {h.label}
              </h3>
              <p className="font-body text-sm text-brown-deep/80">{h.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
