import { Eyebrow } from "./Shared";
import { Reveal } from "./Motion";

// Values copied verbatim from the published lab report. Do not add values
// that are not in the source document. Fields the site does not hold
// (units/dates for some rows) point to the original report instead.
const REPORT_NUMBER = "SIG.LHP.IX.2025.181732511";

const RESULTS = [
  {
    parameter: "Kadar air",
    result: "21,97",
    unit: "%",
    method: "AOAC 969.38B, 2005",
    explain:
      "Kadar air menunjukkan persentase air dalam madu pada sampel yang diuji.",
  },
  {
    parameter: "Coliform",
    result: "0",
    unit: "Lihat laporan asli",
    method: "Lihat laporan asli",
    explain: "Uji cemaran mikroba; hasil tercatat 0 pada sampel yang diuji.",
  },
  {
    parameter: "Total Plate Count (TPC)",
    result: "0",
    unit: "Lihat laporan asli",
    method: "Lihat laporan asli",
    explain: "Jumlah total mikroba; hasil tercatat 0 pada sampel yang diuji.",
  },
  {
    parameter: "Khamir dan kapang",
    result: "Negatif",
    unit: "—",
    method: "Lihat laporan asli",
    explain: "Uji keberadaan khamir dan kapang; hasil tercatat negatif.",
  },
];

export function LabResults() {
  return (
    <section className="bg-cream" aria-labelledby="lab-heading">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-20">
        <Reveal className="max-w-xl mb-6">
          <Eyebrow>Data Laboratorium</Eyebrow>
          <h2 id="lab-heading" className="font-display text-2xl md:text-3xl text-brown font-semibold">
            Hasil Uji Sampel
          </h2>
          <p className="font-body text-sm text-brown-deep/80 mt-3">
            Nomor laporan: <strong>{REPORT_NUMBER}</strong>. Tanggal pengujian
            tercantum pada dokumen laporan asli.
          </p>
        </Reveal>
        <Reveal>
          <ul className="grid gap-3">
            {RESULTS.map((r) => (
              <li key={r.parameter} className="bg-cream-light border border-brown/15 rounded-2xl">
                <details className="group p-5">
                  <summary className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-2 font-body text-brown">
                    <span className="font-display text-lg font-semibold">{r.parameter}</span>
                    <span>
                      <strong>{r.result}</strong>{" "}
                      {r.unit !== "—" && r.unit !== "Lihat laporan asli" ? r.unit : ""}
                    </span>
                  </summary>
                  <dl className="mt-4 grid gap-2 text-sm text-brown-deep/80 sm:grid-cols-[8rem_1fr]">
                    <dt className="font-semibold">Penjelasan</dt>
                    <dd>{r.explain}</dd>
                    <dt className="font-semibold">Metode</dt>
                    <dd>{r.method}</dd>
                    <dt className="font-semibold">Satuan</dt>
                    <dd>{r.unit}</dd>
                  </dl>
                </details>
              </li>
            ))}
          </ul>
          <p className="font-body text-xs italic text-brown-deep/60 mt-4">
            Hasil berlaku untuk sampel yang diuji dan tidak otomatis berlaku
            untuk setiap batch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
