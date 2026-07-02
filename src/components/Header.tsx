import { useState } from "react";
import { CONTACT, NAV_LINKS } from "../constants/brand";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-brown/10">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-display text-2xl md:text-3xl font-semibold text-brown tracking-wide">
            ELVARA
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 font-body text-sm tracking-wide text-brown-deep">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={CONTACT.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-brown text-cream font-body text-sm tracking-wide hover:bg-brown-deep transition-colors"
        >
          Hubungi via WhatsApp
        </a>

        <button
          className="md:hidden text-brown"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-brown/10 bg-cream px-6 py-4 flex flex-col gap-4 font-body text-brown-deep">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex justify-center px-5 py-2.5 rounded-full bg-brown text-cream text-sm"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
