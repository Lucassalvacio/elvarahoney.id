import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { CartDrawer } from "./components/shop/CartDrawer";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import MissionVision from "./pages/MissionVision";
import Sourcing from "./pages/Sourcing";
import Trust from "./pages/Trust";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import { Shop } from "./pages/Shop";
import { Checkout } from "./pages/Checkout";
import { IS_TEST_SITE } from "./constants/siteMode";

/**
 * React Router doesn't scroll for you. This handles two cases:
 *  - navigating to a path with a #hash (e.g. Header links like "/#misi-visi")
 *    scrolls to that section once it's mounted, even coming from another page.
 *  - navigating to a plain path (no hash) scrolls to the top, like a normal
 *    page load would.
 */
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      // Give the newly-routed page a moment to render before we look for the element.
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0 });
  }, [location]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollManager />
        <div className="font-body">
          {IS_TEST_SITE && (
            <div
              role="status"
              className="bg-brown px-4 py-2 text-center text-xs tracking-wide text-cream sm:text-sm"
            >
              SITUS UJI COBA — Pemesanan belum tersedia. Jangan gunakan data
              pribadi atau melakukan pembayaran.
            </div>
          )}
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/misi-visi" element={<MissionVision />} />
            <Route path="/sumber-madu" element={<Sourcing />} />
            <Route path="/kepercayaan" element={<Trust />} />
            <Route path="/koleksi" element={<Products />} />
            <Route path="/kontak" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <CartDrawer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
