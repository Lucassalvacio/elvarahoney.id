import { Products } from "../components/Products";
import { PageIntro, TemplateNote } from "../components/Shared";

export default function ProductsPage() {
  return (
    <>
      <PageIntro eyebrow="Koleksi" title="Produk Kami" />
      <Products />
      <TemplateNote title="Detail Produk">
        TEMPLATE: Tambahkan detail tiap produk: ukuran, harga, manfaat, dan cara penyimpanan.
      </TemplateNote>
    </>
  );
}
