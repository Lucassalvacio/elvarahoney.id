import { Sourcing } from "../components/Sourcing";
import { PageIntro, TemplateNote } from "../components/Shared";

export default function SourcingPage() {
  return (
    <>
      <PageIntro eyebrow="Sumber Madu" title="Dari Hutan NTT" />
      <Sourcing />
      <TemplateNote title="Proses Panen">
        TEMPLATE: Jelaskan tahapan panen, pengolahan, dan pengemasan madu, serta profil mitra petani dan lokasi panen.
      </TemplateNote>
    </>
  );
}
