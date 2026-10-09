/**
 * Vercel Serverless Function — proxies shipping rate requests to Biteship.
 *
 * NOT ACTIVE YET. src/services/shippingService.ts calls this endpoint only
 * when MOCK_MODE is set to false there. Until then, this file is inert —
 * Vercel just won't get any requests to it.
 *
 * To activate:
 *   1. npm install (this file needs no extra deps — plain fetch works on
 *      Vercel's Node runtime).
 *   2. In your Vercel project settings, add an environment variable:
 *        BITESHIP_API_KEY = <your secret key from biteship.com dashboard>
 *   3. Set your pickup address as the default "origin" in your Biteship
 *      dashboard, then fill in ORIGIN_AREA_ID below (Biteship's area-search
 *      endpoint gives you this ID for your NTT/Jakarta warehouse location).
 *   4. Uncomment the implementation below and delete the placeholder.
 *   5. Set MOCK_MODE = false in src/services/shippingService.ts.
 *
 * Docs: https://biteship.com/en/docs (see "Get Rates" / couriers endpoint).
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

const ORIGIN_AREA_ID = "TODO_fill_in_from_biteship_dashboard";
const COURIERS = "grab,gojek,jne,jnt,sicepat"; // comma-separated courier codes to compare

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { destination, totalWeightGrams } = req.body;

  try {
    const biteshipRes = await fetch("https://api.biteship.com/v1/rates/couriers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.BITESHIP_API_KEY as string,
      },
      body: JSON.stringify({
        origin_area_id: ORIGIN_AREA_ID,
        destination_area_id: destination.areaId, // resolved client-side via Biteship's area-search autocomplete
        couriers: COURIERS,
        items: [
          {
            name: "Elvara Honey order",
            value: 100000, // insured value — wire in real cart subtotal
            weight: totalWeightGrams,
            quantity: 1,
          },
        ],
      }),
    });

    const data = await biteshipRes.json();

    // Map Biteship's response shape into our own ShippingOption[] shape
    // (see src/services/shippingService.ts) before returning it.
    const options = data.pricing.map((p: any) => ({
      id: `${p.courier_code}-${p.courier_service_code}`,
      courierName: p.courier_name,
      serviceName: p.courier_service_name,
      price: p.price,
      etaLabel: p.duration,
      isInstant: ["grab", "gojek", "lalamove"].includes(p.courier_code),
    }));

    res.status(200).json(options);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch shipping rates" });
  }
}

export {};
