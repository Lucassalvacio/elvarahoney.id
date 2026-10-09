// Shared shape for anything sold in the shop.
// Keep this in sync with src/data/products.ts.

export type ProductCategory = "bottle" | "hamper";

export interface PackageDimensionsCm {
  length: number;
  width: number;
  height: number;
}

export interface ProductVariant {
  /** Unique across the whole catalog, e.g. "ez-squeeze-125" */
  id: string;
  /** Shown on the pill/selector, e.g. "125gr" */
  label: string;
  /** Price in IDR, no formatting (e.g. 75000, not "75.000") */
  price: number;
  /** Optional strikethrough price for showing a discount */
  compareAtPrice?: number;
  /** Units available. Set to 0 to show "Habis" and disable add-to-cart. */
  stock: number;
  /** Optional SKU for your own bookkeeping */
  sku?: string;
  /** Net weight in grams — used for shipping rate calculation */
  weightGrams: number;
  /** Shipping box dimensions in cm — used for future volumetric-weight shipping calcs */
  packageDimensionsCm?: PackageDimensionsCm;
}

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  /** One-line teaser shown on the product card */
  shortDescription: string;
  /** Longer copy shown in the detail modal — optional */
  description?: string;
  /** Path under src/assets, or a full URL */
  image: string;
  variants: ProductVariant[];
  /** Optional small tag, e.g. "Best Seller", "Baru" */
  badge?: string;
  /** What's physically inside the box — shown as a bullet list in the detail modal */
  contents?: string[];
}