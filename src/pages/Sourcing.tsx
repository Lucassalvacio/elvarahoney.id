import { useRef } from "react";
import { Sourcing } from "../components/Sourcing";
import { PageIntro } from "../components/Shared";
import { BotanicalSway, ReadingProgress } from "../components/Motion";

export default function SourcingPage() {
  const ref = useRef<HTMLElement>(null);
  return (
    <>
      <ReadingProgress targetRef={ref} />
      <article ref={ref} className="relative overflow-hidden">
        <BotanicalSway className="absolute left-2 top-10 hidden h-64 text-brown/20 md:block" />
        <PageIntro eyebrow="Sumber Madu" title="Dari Hutan NTT" />
        <Sourcing />
      </article>
    </>
  );
}
