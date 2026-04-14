import { initializeApp, cert, getApps, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

/**
 * Firebase Admin SDK — singleton initialisation.
 * Uses service-account credentials from environment variables.
 */

function getFirebaseApp(): App {
  const existing = getApps();
  if (existing.length > 0) return existing[0];

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    const missing = [
      !projectId && "FIREBASE_PROJECT_ID",
      !clientEmail && "FIREBASE_CLIENT_EMAIL",
      !privateKey && "FIREBASE_PRIVATE_KEY",
    ].filter(Boolean);
    throw new Error(
      `Missing Firebase credentials: ${missing.join(", ")}. Set them in environment variables.`
    );
  }

  // Handle all private key formats from different environments:
  // - Vercel may store it with literal \n (escaped newlines)
  // - Some envs may wrap it in extra quotes
  // - The key MUST have actual newline characters to work
  privateKey = privateKey.replace(/\\n/g, "\n");

  // Remove wrapping quotes if present (e.g. "-----BEGIN..." or '-----BEGIN...')
  if (
    (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
    (privateKey.startsWith("'") && privateKey.endsWith("'"))
  ) {
    privateKey = privateKey.slice(1, -1).replace(/\\n/g, "\n");
  }

  console.log("[Firebase] Initializing with project:", projectId);
  console.log("[Firebase] Client email:", clientEmail);
  console.log(
    "[Firebase] Private key starts with:",
    privateKey.substring(0, 30) + "..."
  );

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

let _db: Firestore | null = null;

export function getDb(): Firestore {
  if (!_db) {
    getFirebaseApp();
    _db = getFirestore();
  }
  return _db;
}
