import { IS_TEST_SITE } from "../constants/siteMode";

/**
 * Shipping rate service for Elvara Honey.
 *
 * Test mode uses simulated rates so the checkout UI can be tested without
 * calling a shipping provider. No real rates are fetched and no shipment is
 * ever booked. Live mode needs the Biteship endpoint configured below.
 *
 * We recommend Biteship (https://biteship.com) as the courier aggregator:
 * one API surfaces instant couriers (Grab, Gojek, Lalamove) alongside
 * regular nationwide couriers (JNE, J&T, SiCepat, AnterAja, etc.), so you
 * don't need to integrate each courier separately.
 *
 * IMPORTANT: Biteship (like virtually every shipping/payment API) requires
 * a secret API key that must never be exposed in client-side code. That
 * means this call CANNOT go directly from the browser to Biteship — it
 * needs a small backend proxy. Since this project deploys on Vercel, the
 * cleanest option is a Vercel Serverless Function. A ready-to-fill scaffold
 * for that is at /api/shipping-rates.ts (repo root, not inside src/) —
 * see the comments there.
 *
 * To activate real rates:
 *   1. Sign up at biteship.com, get your API key, and set your pickup
 *      location (origin) in your Biteship dashboard.
 *   2. Fill in /api/shipping-rates.ts and add BITESHIP_API_KEY to your
 *      Vercel project's environment variables.
 *   3. Set VITE_SITE_MODE=live in the deployment environment.
 *   4. Deploy — the fetch() call below will then hit your live endpoint.
 */

export const SHIPPING_RATES_ARE_MOCKED = IS_TEST_SITE;

export interface ShippingDestination {
  /** Free-text is fine for mock mode; Biteship wants an area_id from their area-search endpoint in live mode */
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface ShippingOption {
  id: string; // e.g. "grab-instant", "jne-reg"
  courierName: string; // e.g. "Grab Instant", "JNE"
  serviceName: string; // e.g. "Instant", "Reguler", "YES"
  price: number; // IDR
  etaLabel: string; // e.g. "±60 menit", "2-3 hari"
  isInstant: boolean;
}

const MOCK_OPTIONS: ShippingOption[] = [
  {
    id: "grab-instant",
    courierName: "Grab",
    serviceName: "Instant",
    price: 25000,
    etaLabel: "±60 menit (Jabodetabek)",
    isInstant: true,
  },
  {
    id: "gosend-instant",
    courierName: "Gojek",
    serviceName: "GoSend Instant",
    price: 23000,
    etaLabel: "±60 menit (Jabodetabek)",
    isInstant: true,
  },
  {
    id: "jne-reg",
    courierName: "JNE",
    serviceName: "Reguler",
    price: 15000,
    etaLabel: "2-3 hari",
    isInstant: false,
  },
  {
    id: "jnt-ez",
    courierName: "J&T",
    serviceName: "EZ",
    price: 14000,
    etaLabel: "2-4 hari",
    isInstant: false,
  },
  {
    id: "sicepat-reg",
    courierName: "SiCepat",
    serviceName: "Reguler",
    price: 13000,
    etaLabel: "2-4 hari",
    isInstant: false,
  },
];

export interface GetRatesParams {
  destination: ShippingDestination;
  totalWeightGrams: number;
}

export async function getShippingRates(
  params: GetRatesParams
): Promise<ShippingOption[]> {
  if (SHIPPING_RATES_ARE_MOCKED) {
    // Simulate network latency so the UI's loading state is visible/testable.
    await new Promise((resolve) => setTimeout(resolve, 600));
    // Very rough mock: nudge regular-courier prices up a bit for heavier parcels.
    const weightSurcharge = Math.max(0, params.totalWeightGrams - 1000) * 3;
    return MOCK_OPTIONS.map((opt) =>
      opt.isInstant
        ? opt
        : { ...opt, price: opt.price + Math.round(weightSurcharge) }
    );
  }

  // Live mode — calls our own backend proxy, never Biteship directly.
  const response = await fetch("/api/shipping-rates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil ongkos kirim. Coba lagi sebentar lagi.");
  }

  return (await response.json()) as ShippingOption[];
}
