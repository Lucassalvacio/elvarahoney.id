import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MissionVision } from "./components/MissionVision";
import { Sourcing } from "./components/Sourcing";
import { Trust } from "./components/Trust";
import { Products } from "./components/Products";
import { Contact } from "./components/Contact";
import { SectionDivider } from "./components/Shared";
import ReviewMarquee from "./components/ReviewMarquee";
import { CartProvider } from "./context/CartContext";
import { CartDrawer } from "./components/shop/CartDrawer";
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

function Home() {
  return (
    <>
      <a href="https://shopee.co.id/elvarahoney" id="coming-soon-a">
        <p id="coming-soon">Coming Soon</p>
      </a>
      <Hero />
      <SectionDivider />
      <MissionVision />
      <Sourcing />
      <Trust />
      <Products />
      <ReviewMarquee />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="font-body">
          <ScrollManager />
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
            <Route path="/toko" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <CartDrawer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
