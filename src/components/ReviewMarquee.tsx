
type Review = {
    name: string;
    text: string;
    rating: number;
  };
  
  const reviews: Review[] = [
    {
      name: "fo***h",
      rating: 5,
      text: "Sdh beli ke berapa kalinya disini, Ok bgt. Recommended",
    },
    {
      name: "ke***g",
      rating: 5,
      text: "Rasa & Kualitas: Mantap, Admin ramah tingkat maksimal, kualitas aman, bubble wrapnya banyak. Aman banget.",
    },
    {
      name: "ak***e",
      rating: 5,
      text: "Puas bgt sama seller nya. Beli terburu2 karna udah mau libur panjang nih, aku minta ada ucapan yg ternyata ga available. Tp ternyata seller mengupayakan dengan sangat baik. Terimakasih banyak yaaa. Packagingnya juga bagus. Pengiriman cepat. Thanks seller 🤍",
    },
    {
      name: "es***n",
      rating: 5,
      text: "Bought it for my parents and they love it.Ga sempat foto tapi tadi dicek semua aman. Di bubble luar dan dalam. Req kartu ucapan dan di kasih. Pengiriman instant sangat aman. Thank you ✨ May God bless you and your business",
    },
    {
      name: "fr***l",
      rating: 5,
      text: "Madu ini enak banget, aku pakai untuk membuat dalgona coffee. Krn ga suka kopi manis, aku ganti gula dg madu ini. Dalgona coffee-nya jd enak bngt, jd kyk ada taste wein coffee gitu.",
    },
    {
        name: "ri***8",
        rating: 5,
        text: "enak bgtt, semenjak beli ini tubuh makin fit n ga mudah drop",
    },
    {
        name: "wa***2",
        rating: 5,
        text: "Saya cocok dgn madu ini.sangat sangat membantu sekali utk ngurangi mual khususnya kalau asam lambung lagi banyak.",
    },
    {
        name: "jo***1",
        rating: 5,
        text: "Sudah bertahun tahun konsumsi madu ini, sekarang pemesanan lebih mudah karena ada di shopee, menjaga kesehatan keluarga",
    },
    {
        name: "nu***g",
        rating: 5,
        text: "Cepet banget datengnya, adminnya juga fast respon, madunya sudah aku coba, madu asli ini sih ♥️. Next order lagi",
    },
    {
        name: "va***3",
        rating: 5,
        text: "Sudah datang, packing aman banget. Ukuran besar, nanti update lagi kalau udah dicoba😁🙏🏻",
    },
    {
        name: "ki***l",
        rating: 5,
        text: "Sudah test sya, madu asli sih, lumayan beda rsany dgn madu yg lain. Makasih",
    },
    {
        name: "ki***l",
        rating: 5,
        text: "Cepet udh trima madunya. Orang tua suka karena tastenya natural, ga over manis jg. Kadar gua darah ortu sya jg ga trlalu naik abs minum madu ini. Thank u seller",
    },
  ];
  
  export default function ReviewMarquee() {
    return (
        <section className="overflow-hidden py-10">
        <div className="flex w-max animate-marquee gap-6">
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={index}
              className="w-80 shrink-0 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 text-yellow-500">
                {"★".repeat(review.rating)}
              </div>
  
              <p className="text-neutral-600">
                "{review.text}"
              </p>
  
              <p className="mt-4 font-semibold">
                — {review.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }