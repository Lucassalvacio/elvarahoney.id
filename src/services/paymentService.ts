/**
 * Payment methods for Elvara Honey checkout.
 *
 * NOT ACTIVE YET — this only powers the payment-method selector UI. No
 * real payment gateway is wired in, and "Konfirmasi Pesanan" does not move
 * any money. It packages the order into a message and opens WhatsApp, so
 * you can confirm and take payment manually the way you do today.
 *
 * To go live later, the two common choices for Indonesia are:
 *   - Midtrans Snap (https://midtrans.com) — widely used, supports
 *     virtual account, e-wallet, QRIS, card, in one Snap popup.
 *   - Xendit (https://xendit.co) — similar coverage, invoice-based API.
 * Either requires a small backend endpoint (Vercel Serverless Function,
 * same pattern as /api/shipping-rates.ts) to create the transaction with
 * your secret server key, then redirect/open the Snap popup client-side.
 */

export type PaymentMethodId = "bank_transfer" | "qris" | "card";

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  note: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "bank_transfer",
    label: "Transfer Bank",
    note: "Konfirmasi manual setelah checkout",
  },
  {
    id: "qris",
    label: "QRIS",
    note: "Segera hadir — akan terhubung ke Midtrans/Xendit",
  },
  {
    id: "card",
    label: "Kartu Debit/Kredit",
    note: "Segera hadir — akan terhubung ke Midtrans/Xendit",
  },
];
