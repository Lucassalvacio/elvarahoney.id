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

export default function App() {
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
