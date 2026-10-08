import { MissionVision } from "../components/MissionVision";
import { PageIntro, TemplateNote } from "../components/Shared";

export default function MissionVisionPage() {
  return (
    <>
      <PageIntro eyebrow="Tentang Kami" title="Misi & Visi" />
      <MissionVision />
      <TemplateNote title="Cerita Elvara">
        TEMPLATE: Tambahkan kisah pendirian Elvara, nilai-nilai merek, dan profil tim di sini.
      </TemplateNote>
    </>
  );
}
