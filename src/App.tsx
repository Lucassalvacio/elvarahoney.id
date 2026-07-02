import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MissionVision } from "./components/MissionVision";
import { Sourcing } from "./components/Sourcing";
import { Trust } from "./components/Trust";
import { Products } from "./components/Products";
import { Contact } from "./components/Contact";
import { SectionDivider } from "./components/Shared";
import ReviewMarquee from "./components/ReviewMarquee";

export default function App() {
  return (
    <div className="font-body">
      <Header />
      <Hero />
      <SectionDivider />
      <MissionVision />
      <Sourcing />
      <Trust />
      <Products />
      <ReviewMarquee/>
      <Contact />
    </div>
  );
}
