/**
 * Service layer for contact / hamper-inquiry submissions.
 *
 * Currently the site has no backend — the "Contact" section links straight
 * to WhatsApp, Instagram, Shopee, and email. If you later want an on-page
 * form (e.g. bulk hamper inquiries, newsletter signup), implement it here
 * and swap the `console.info` below for a real Firestore write. Components
 * should call `submitInquiry()` and never touch Firebase directly.
 */

export interface InquiryPayload {
  name: string;
  contact: string; // email or phone
  message: string;
}

export async function submitInquiry(payload: InquiryPayload): Promise<{ ok: boolean }> {
  // Placeholder implementation — replace with a Firestore write once
  // src/lib/firebase.ts is activated, e.g.:
  //   await addDoc(collection(db, "inquiries"), { ...payload, createdAt: serverTimestamp() });
  console.info("[contactService] Inquiry captured (backend not yet connected):", payload);
  return { ok: true };
}
