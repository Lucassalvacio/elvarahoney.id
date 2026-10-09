import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CONTACT, NAV_LINKS } from "../constants/brand";
import { useCart } from "../context/CartContext";

function CartButton() {
  const { totalItems, openCart } = useCart();
  return (
    <button
      onClick={openCart}
      aria-label="Buka keranjang"
      className="relative text-brown"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.8h8.2a2 2 0 0 0 2-1.6L21 8H6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="21" r="1.4" fill="currentColor" />
        <circle cx="17.5" cy="21" r="1.4" fill="currentColor" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-gold text-brown text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-brown/10">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl md:text-3xl font-semibold text-brown tracking-wide">
            ELVARA
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-body text-sm tracking-wide text-brown-deep">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end
              className={({ isActive }) =>
                `hover:text-gold transition-colors ${isActive ? "text-gold" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/toko" className="hover:text-gold transition-colors">
            Toko
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <CartButton />
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-brown text-cream font-body text-sm tracking-wide hover:bg-brown-deep transition-colors"
          >
            Hubungi via WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <CartButton />
          <button
            className="text-brown"
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
      </div>

      {open && (
        <div className="md:hidden border-t border-brown/10 bg-cream px-6 py-4 flex flex-col gap-4 font-body text-brown-deep">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end
              onClick={() => setOpen(false)}
              className="py-1"
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/toko" onClick={() => setOpen(false)} className="py-1">
            Toko
          </Link>
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
