import type { Product } from "../types/product";
import placeholderImg from "../assets/placeholder-product.svg";

/**
 * ============================================================
 *  PRODUCT CATALOG — fill in the TODOs, then delete this note.
 * ============================================================
 *
 * - `price` / `compareAtPrice` are plain numbers in IDR (75000, not "75.000").
 * - `stock` = 0 automatically shows "Habis" and disables Add to Cart.
 * - `weightGrams` matters — it feeds the shipping rate calculation later.
 * - `image` — swap `placeholderImg` for a real photo the same way the rest
 *   of the site does (drop a file in src/assets and import it here).
 * - Feel free to add/remove variants or whole products; nothing else in
 *   the shop needs to change since everything reads from this file.
 */

export const PRODUCTS: Product[] = [
  {
    id: "ez-squeeze",
    category: "bottle",
    name: "Ez Squeeze Bottle",
    shortDescription: "Madu murni harian, dalam genggaman.",
    description: "TODO: deskripsi panjang untuk halaman produk (opsional).",
    image: placeholderImg,
    badge: "Best Seller",
    variants: [
      {
        id: "ez-squeeze-125",
        label: "125gr",
        price: 120000, // TODO: isi harga
        stock: 100, // TODO: isi stok
        weightGrams: 140, // TODO: berat termasuk botol
        sku: "EZ-125",
      },
      {
        id: "ez-squeeze-250",
        label: "250gr",
        price: 205000, // TODO: isi harga
        stock: 100, // TODO: isi stok
        weightGrams: 275,
        sku: "EZ-250",
      },
      {
        id: "ez-squeeze-500",
        label: "500gr",
        price: 380000, // TODO: isi harga
        stock: 100, // TODO: isi stok
        weightGrams: 500,
        sku: "EZ-500",
      },
    ],
  },
  {
    id: "daily-ritual",
    category: "hamper",
    name: "Daily Ritual",
    shortDescription: "Untuk kebiasaan sehat harian.",
    description:
      "Set hampers lengkap untuk menikmati madu dengan lebih personal dan nyaman, ideal sebagai hadiah spesial, corporate gift, atau hampers wisuda / graduation.",
    image: placeholderImg,
    contents: [
      "1 Botol Madu Hutan @700 gram",
      "1 Sendok Madu Kayu",
      "1 Tea Mug",
      "1 Coaster Kayu",
    ],
    variants: [
      {
        id: "daily-ritual-standard",
        label: "Standard",
        price: 575000,
        stock: 17,
        weightGrams: 2100,
        packageDimensionsCm: { length: 30, width: 20, height: 8 },
        sku: "HP-DAILY",
      },
    ],
  },
  {
    id: "tea-ritual",
    category: "hamper",
    name: "Tea Ritual",
    shortDescription: "Madu, dipasangkan dengan teh pilihan.",
    description:
      "Nikmati madu bersama teh premium pilihan. Tulis pilihan varian teh di catatan saat checkout — jika tidak ada catatan, akan dikirim varian acak.",
    image: placeholderImg,
    contents: [
      "1 Botol Madu Hutan @700 gram",
      "1 Sendok Madu Kayu",
      "1 Tea Mug",
      "50gr Teh Premium Elvara (pilih varian: Osmanthus Oolong / Jasmin Snow Buds / Peach Oolong / Wanli Black Tea)",
    ],
    variants: [
      {
        id: "tea-ritual-standard",
        label: "Standard",
        price: 750000,
        stock: 10,
        weightGrams: 2100,
        packageDimensionsCm: { length: 30, width: 20, height: 8 },
        sku: "HP-TEA",
      },
    ],
  },
  {
    id: "heritage-duo",
    category: "hamper",
    name: "Heritage Duo",
    shortDescription: "2× botol 700gr + sendok kayu — hadiah istimewa.",
    description:
      "Pilihan sederhana dan eksklusif untuk penikmat madu murni, cocok sebagai hadiah praktis namun tetap berkelas.",
    image: placeholderImg,
    badge: "Premium",
    contents: ["2 Botol Madu Hutan @700 gram", "1 Sendok Madu Kayu"],
    variants: [
      {
        id: "heritage-duo-standard",
        label: "Standard",
        price: 900000,
        stock: 23,
        weightGrams: 2500,
        packageDimensionsCm: { length: 30, width: 20, height: 8 },
        sku: "HP-HERITAGE",
      },
    ],
  },
];

export function findProduct(productId: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === productId);
}

export function findVariant(productId: string, variantId: string) {
  const product = findProduct(productId);
  return product?.variants.find((v) => v.id === variantId);
}