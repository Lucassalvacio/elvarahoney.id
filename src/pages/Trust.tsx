import { Trust } from "../components/Trust";
import { PageIntro, TemplateNote } from "../components/Shared";

export default function TrustPage() {
  return (
    <>
      <PageIntro eyebrow="Kepercayaan" title="Mengapa Elvara" />
      <Trust />
      <TemplateNote title="Sertifikasi & Uji Lab">
        TEMPLATE: Cantumkan sertifikasi (BPOM, halal, hasil uji laboratorium) dan FAQ seputar keaslian madu.
      </TemplateNote>
    </>
  );
}
