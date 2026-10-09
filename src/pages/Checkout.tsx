import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartDetails } from "../context/CartContext";
import { formatIDR } from "../lib/format";
import { Eyebrow } from "../components/Shared";
import {
  getShippingRates,
  type ShippingDestination,
  type ShippingOption,
} from "../services/shippingService";
import { PAYMENT_METHODS, type PaymentMethodId } from "../services/paymentService";
import { SHIPPING_RATES_ARE_MOCKED } from "../services/shippingService";
import { CONTACT } from "../constants/brand";
import { IS_TEST_SITE } from "../constants/siteMode";

const EMPTY_ADDRESS: ShippingDestination = {
  address: "",
  city: "",
  province: "",
  postalCode: "",
};

export function Checkout() {
  const { detailed, subtotal, totalWeightGrams, clearCart } = useCartDetails();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState<ShippingDestination>(EMPTY_ADDRESS);

  const [rates, setRates] = useState<ShippingOption[] | null>(null);
  const [loadingRates, setLoadingRates] = useState(false);
  const [rateError, setRateError] = useState<string | null>(null);
  const [selectedRateId, setSelectedRateId] = useState<string | null>(null);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodId>("bank_transfer");

  const addressComplete =
    address.address && address.city && address.province && address.postalCode;

  const selectedRate = rates?.find((r) => r.id === selectedRateId) ?? null;
  const shippingCost = selectedRate?.price ?? 0;
  const total = subtotal + shippingCost;

  async function handleCheckRates() {
    setLoadingRates(true);
    setRateError(null);
    setRates(null);
    setSelectedRateId(null);
    try {
      const result = await getShippingRates({
        destination: address,
        totalWeightGrams,
      });
      setRates(result);
    } catch (err) {
      setRateError(
        err instanceof Error ? err.message : "Gagal mengambil ongkos kirim."
      );
    } finally {
      setLoadingRates(false);
    }
  }

  function handlePlaceOrder() {
    const lines = detailed
      .map(
        ({ product, variant, line }) =>
          `- ${product.name} (${variant.label}) x${line.qty} — ${formatIDR(
            variant.price * line.qty
          )}`
      )
      .join("\n");

    const message = [
      `Halo Elvara Honey, saya ingin memesan:`,
      ``,
      lines,
      ``,
      `Subtotal: ${formatIDR(subtotal)}`,
      selectedRate
        ? `Pengiriman: ${selectedRate.courierName} ${selectedRate.serviceName} — ${formatIDR(shippingCost)}`
        : `Pengiriman: belum dipilih`,
      `Total: ${formatIDR(total)}`,
      `Metode pembayaran: ${
        PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label
      }`,
      ``,
      `Nama: ${name}`,
      `No. HP: ${phone}`,
      `Alamat: ${address.address}, ${address.city}, ${address.province} ${address.postalCode}`,
    ].join("\n");

    const whatsappUrl = `${CONTACT.whatsappHref}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    clearCart();
    navigate("/toko");
  }

  if (detailed.length === 0) {
    return (
      <section className="bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-body text-brown-deep/70 mb-4">
            Keranjang kosong. Yuk pilih produk dulu.
          </p>
          <Link
            to="/toko"
            className="inline-flex items-center px-6 py-3 rounded-full bg-brown text-cream font-body text-sm"
          >
            Ke Toko
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-14 md:py-20">
        <Eyebrow>Checkout</Eyebrow>
        <h1 className="font-display text-3xl md:text-4xl text-brown font-semibold mb-10">
          Selesaikan Pesanan
        </h1>

        {/* Order summary */}
        <div className="bg-cream-light border border-brown/15 rounded-2xl p-6 mb-8">
          <h2 className="font-display text-lg text-brown font-semibold mb-4">
            Ringkasan Pesanan
          </h2>
          <div className="space-y-2 mb-4">
            {detailed.map(({ line, product, variant }) => (
              <div
                key={`${line.productId}-${line.variantId}`}
                className="flex justify-between font-body text-sm text-brown-deep"
              >
                <span>
                  {product.name} ({variant.label}) × {line.qty}
                </span>
                <span>{formatIDR(variant.price * line.qty)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-body text-sm text-brown-deep/70 pt-3 border-t border-brown/10">
            <span>Subtotal</span>
            <span>{formatIDR(subtotal)}</span>
          </div>
        </div>

        {/* Address */}
        <div className="bg-cream-light border border-brown/15 rounded-2xl p-6 mb-8">
          <h2 className="font-display text-lg text-brown font-semibold mb-4">
            Alamat Pengiriman
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              className="font-body text-sm border border-brown/25 rounded-lg px-4 py-2.5 bg-cream sm:col-span-2"
              placeholder="Nama Penerima"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="font-body text-sm border border-brown/25 rounded-lg px-4 py-2.5 bg-cream sm:col-span-2"
              placeholder="No. HP / WhatsApp"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              className="font-body text-sm border border-brown/25 rounded-lg px-4 py-2.5 bg-cream sm:col-span-2"
              placeholder="Alamat lengkap (jalan, no. rumah, RT/RW)"
              rows={2}
              value={address.address}
              onChange={(e) =>
                setAddress((a) => ({ ...a, address: e.target.value }))
              }
            />
            <input
              className="font-body text-sm border border-brown/25 rounded-lg px-4 py-2.5 bg-cream"
              placeholder="Kota/Kabupaten"
              value={address.city}
              onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
            />
            <input
              className="font-body text-sm border border-brown/25 rounded-lg px-4 py-2.5 bg-cream"
              placeholder="Provinsi"
              value={address.province}
              onChange={(e) =>
                setAddress((a) => ({ ...a, province: e.target.value }))
              }
            />
            <input
              className="font-body text-sm border border-brown/25 rounded-lg px-4 py-2.5 bg-cream sm:col-span-2"
              placeholder="Kode Pos"
              value={address.postalCode}
              onChange={(e) =>
                setAddress((a) => ({ ...a, postalCode: e.target.value }))
              }
            />
          </div>

          <button
            onClick={handleCheckRates}
            disabled={!addressComplete || loadingRates}
            className="mt-4 inline-flex items-center px-6 py-2.5 rounded-full border border-brown text-brown font-body text-sm hover:bg-brown hover:text-cream transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loadingRates ? "Mengecek ongkir..." : "Cek Ongkir"}
          </button>

          {rateError && (
            <p className="font-body text-sm text-red-700 mt-3">{rateError}</p>
          )}

          {rates && (
            <div className="mt-5 space-y-2">
              {SHIPPING_RATES_ARE_MOCKED && (
                <p className="font-body text-xs text-brown-deep/60">
                  Ongkir simulasi untuk pengujian, bukan tarif aktual.
                </p>
              )}
              {rates.map((rate) => (
                <label
                  key={rate.id}
                  className={`flex items-center justify-between gap-4 border rounded-lg px-4 py-3 cursor-pointer transition-colors ${
                    selectedRateId === rate.id
                      ? "border-brown bg-cream"
                      : "border-brown/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping-rate"
                      checked={selectedRateId === rate.id}
                      onChange={() => setSelectedRateId(rate.id)}
                    />
                    <div>
                      <p className="font-body text-sm text-brown font-medium">
                        {rate.courierName} — {rate.serviceName}
                        {rate.isInstant && (
                          <span className="ml-2 text-xs text-gold font-semibold">
                            Instan
                          </span>
                        )}
                      </p>
                      <p className="font-body text-xs text-brown-deep/60">
                        {rate.etaLabel}
                      </p>
                    </div>
                  </div>
                  <span className="font-body text-sm text-brown font-semibold">
                    {formatIDR(rate.price)}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Payment method (mockup) */}
        <div className="bg-cream-light border border-brown/15 rounded-2xl p-6 mb-8">
          <h2 className="font-display text-lg text-brown font-semibold mb-1">
            Metode Pembayaran
          </h2>
          <p className="font-body text-xs text-brown-deep/50 mb-4 italic">
            Tampilan awal — pembayaran online belum aktif. Pesanan
            dikonfirmasi manual via WhatsApp untuk saat ini.
          </p>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((method) => (
              <label
                key={method.id}
                className={`flex items-center justify-between gap-4 border rounded-lg px-4 py-3 cursor-pointer transition-colors ${
                  paymentMethod === method.id
                    ? "border-brown bg-cream"
                    : "border-brown/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                  />
                  <span className="font-body text-sm text-brown font-medium">
                    {method.label}
                  </span>
                </div>
                <span className="font-body text-xs text-brown-deep/50">
                  {method.note}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Total & submit */}
        <div className="bg-brown text-cream rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-body text-sm text-cream/70">Total Bayar</p>
            <p className="font-display text-2xl font-semibold">
              {formatIDR(total)}
            </p>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={
              IS_TEST_SITE || !name || !phone || !addressComplete || !selectedRate
            }
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-cream text-brown font-body text-sm tracking-wide hover:bg-cream-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {IS_TEST_SITE
              ? "Pemesanan nonaktif selama uji coba"
              : "Konfirmasi via WhatsApp →"}
          </button>
        </div>
      </div>
    </section>
  );
}
