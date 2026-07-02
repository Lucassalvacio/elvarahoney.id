/**
 * Firebase bootstrap for Elvara Honey.
 *
 * NOT ACTIVE YET. The landing page currently has no backend needs — this file
 * exists so a future feature (newsletter signup, hamper inquiry form, order
 * tracking, etc.) can plug in without restructuring the app.
 *
 * To activate:
 *   1. npm install firebase
 *   2. Create a Firebase project, copy its config into a `.env` file:
 *        VITE_FIREBASE_API_KEY=...
 *        VITE_FIREBASE_AUTH_DOMAIN=...
 *        VITE_FIREBASE_PROJECT_ID=...
 *        VITE_FIREBASE_STORAGE_BUCKET=...
 *        VITE_FIREBASE_MESSAGING_SENDER_ID=...
 *        VITE_FIREBASE_APP_ID=...
 *   3. Uncomment the code below.
 *   4. Import `db` (or `auth`) from this file inside src/services/*.ts —
 *      never call Firebase directly from components.
 */

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

export {};
