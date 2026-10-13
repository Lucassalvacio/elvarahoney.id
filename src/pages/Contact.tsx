import { Contact } from "../components/Contact";
import { PageIntro } from "../components/Shared";

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Kontak" title="Hubungi Kami" />
      <Contact />
    </>
  );
}
