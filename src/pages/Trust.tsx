import { useRef } from "react";
import { Trust } from "../components/Trust";
import { LabResults } from "../components/LabResults";
import { PageIntro } from "../components/Shared";
import { ReadingProgress } from "../components/Motion";

export default function TrustPage() {
  const ref = useRef<HTMLElement>(null);
  return (
    <>
      <ReadingProgress targetRef={ref} />
      <article ref={ref}>
        <PageIntro eyebrow="Kepercayaan" title="Mengapa Elvara" />
        <Trust />
        <LabResults />
      </article>
    </>
  );
}
