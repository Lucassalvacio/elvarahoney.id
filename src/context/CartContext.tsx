import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { findProduct, findVariant } from "../data/products";

export interface CartLine {
  productId: string;
  variantId: string;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  addItem: (productId: string, variantId: string, qty?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  setQty: (productId: string, variantId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  totalWeightGrams: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const STORAGE_KEY = "elvara-cart-v1";

const CartContext = createContext<CartContextValue | undefined>(undefined);

function loadInitialLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadInitialLines);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // localStorage unavailable (e.g. private browsing) — cart just won't persist.
    }
  }, [lines]);

  function addItem(productId: string, variantId: string, qty = 1) {
    setLines((prev) => {
      const existing = prev.find(
        (l) => l.productId === productId && l.variantId === variantId
      );
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, qty: l.qty + qty } : l
        );
      }
      return [...prev, { productId, variantId, qty }];
    });
    setCartOpen(true);
  }

  function removeItem(productId: string, variantId: string) {
    setLines((prev) =>
      prev.filter(
        (l) => !(l.productId === productId && l.variantId === variantId)
      )
    );
  }

  function setQty(productId: string, variantId: string, qty: number) {
    if (qty <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setLines((prev) =>
      prev.map((l) =>
        l.productId === productId && l.variantId === variantId
          ? { ...l, qty }
          : l
      )
    );
  }

  function clearCart() {
    setLines([]);
  }

  const { totalItems, subtotal, totalWeightGrams } = useMemo(() => {
    let items = 0;
    let sum = 0;
    let weight = 0;
    for (const line of lines) {
      const variant = findVariant(line.productId, line.variantId);
      if (!variant) continue;
      items += line.qty;
      sum += variant.price * line.qty;
      weight += variant.weightGrams * line.qty;
    }
    return { totalItems: items, subtotal: sum, totalWeightGrams: weight };
  }, [lines]);

  const value: CartContextValue = {
    lines,
    addItem,
    removeItem,
    setQty,
    clearCart,
    totalItems,
    subtotal,
    totalWeightGrams,
    isCartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

/** Convenience: cart lines joined with their product/variant data, ready to render. */
export function useCartDetails() {
  const { lines, ...rest } = useCart();
  const detailed = lines
    .map((line) => {
      const product = findProduct(line.productId);
      const variant = findVariant(line.productId, line.variantId);
      if (!product || !variant) return null;
      return { line, product, variant };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return { detailed, ...rest };
}
