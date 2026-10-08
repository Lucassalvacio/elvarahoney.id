import { Contact } from "../components/Contact";
import { PageIntro, TemplateNote } from "../components/Shared";

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Kontak" title="Hubungi Kami" />
      <Contact />
      <TemplateNote title="Informasi Tambahan">
        TEMPLATE: Tambahkan alamat, jam layanan, dan peta lokasi jika tersedia.
      </TemplateNote>
    </>
  );
}
