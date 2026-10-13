import { Products } from "../components/Products";
import { PageIntro } from "../components/Shared";

export default function ProductsPage() {
  return (
    <>
      <PageIntro eyebrow="Koleksi" title="Produk Kami" />
      <Products />
    </>
  );
}
