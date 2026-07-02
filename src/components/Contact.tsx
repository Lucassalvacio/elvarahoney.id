import { CONTACT } from "../constants/brand";
import { Eyebrow } from "./Shared";

const ITEMS = [
  { label: "WhatsApp", value: CONTACT.whatsapp, href: CONTACT.whatsappHref },
  {
    label: "Instagram",
    value: CONTACT.instagram,
    href: CONTACT.instagramHref,
  },
  { label: "Shopee", value: CONTACT.shopee, href: CONTACT.shopeeHref },
  { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
];

export function Contact() {
  return (
    <section id="kontak" className="bg-brown text-cream">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="text-center max-w-lg mx-auto mb-14">
          <Eyebrow>Hubungi Kami</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Pastikan Langsung dari Sumbernya
          </h2>
          <p className="font-body text-cream/75 leading-relaxed">
            Kami hanya berjualan resmi di Shopee. Hubungi kami langsung untuk
            memverifikasi keaslian produk atau bertanya seputar Elvara.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-cream/20 rounded-xl p-6 text-center hover:border-gold hover:bg-cream/5 transition-colors"
            >
              <p className="font-body text-xs tracking-[0.2em] uppercase text-gold-light mb-2">
                {item.label}
              </p>
              <p className="font-body text-sm break-words">{item.value}</p>
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 pt-10 border-t border-cream/15">
          <span className="font-display text-2xl font-semibold tracking-wide">
            Elvara Honey
          </span>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-cream/60">
            From Hive to Healing
          </p>
          <p className="font-body text-xs text-cream/40 mt-4">
            © {new Date().getFullYear()} Elvara Honey. Madu hutan murni dari
            Nusa Tenggara Timur.
          </p>
        </div>
      </div>
    </section>
  );
}
