import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import Home from "./pages/Home";
import MissionVision from "./pages/MissionVision";
import Sourcing from "./pages/Sourcing";
import Trust from "./pages/Trust";
import Products from "./pages/Products";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
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
    <BrowserRouter>
      <ScrollToTop />
      <div className="font-body">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/misi-visi" element={<MissionVision />} />
          <Route path="/sumber-madu" element={<Sourcing />} />
          <Route path="/kepercayaan" element={<Trust />} />
          <Route path="/koleksi" element={<Products />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
