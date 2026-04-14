/**
 * Firestore-backed storage for DigitalFlowers bouquets.
 * Each bouquet is a document in the "bouquets" collection, keyed by slug.
 */

import { getDb } from "./firebase";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

export interface BouquetRecord {
  slug: string;
  flowerType: string;
  flowerColor: string;
  bouquetStyle: string;
  wrappingStyle: string;
  ribbonStyle: string;
  decorations: string[];
  size: string;
  arrangementPosition: string;
  petalDensity: string;
  message: string;
  createdAt: string;
  expiresAt: string;
  shareCount: number;
  published: boolean;
  shareUrl: string;
}

const COLLECTION = "bouquets";

// ── Public API ──

export async function createBouquet(
  data: Omit<BouquetRecord, "createdAt">
): Promise<BouquetRecord> {
  const db = getDb();
  const record: BouquetRecord = {
    ...data,
    createdAt: new Date().toISOString(),
  };

  // Use slug as document ID for fast lookups
  await db.collection(COLLECTION).doc(data.slug).set({
    ...record,
    // Store expiresAt as a Firestore Timestamp so TTL policy works
    expiresAt: Timestamp.fromDate(new Date(record.expiresAt)),
    createdAt: Timestamp.fromDate(new Date(record.createdAt)),
  });

  return record;
}

export async function findBouquetBySlug(
  slug: string
): Promise<BouquetRecord | null> {
  const db = getDb();
  const doc = await db.collection(COLLECTION).doc(slug).get();

  if (!doc.exists) return null;

  const data = doc.data()!;

  // Convert Firestore Timestamps back to ISO strings
  const expiresAt =
    data.expiresAt instanceof Timestamp
      ? data.expiresAt.toDate().toISOString()
      : data.expiresAt;
  const createdAt =
    data.createdAt instanceof Timestamp
      ? data.createdAt.toDate().toISOString()
      : data.createdAt;

  // Check if expired or unpublished
  if (!data.published || new Date(expiresAt) <= new Date()) {
    return null;
  }

  return {
    ...data,
    expiresAt,
    createdAt,
  } as BouquetRecord;
}

export async function incrementShareCount(slug: string): Promise<void> {
  const db = getDb();
  await db
    .collection(COLLECTION)
    .doc(slug)
    .update({ shareCount: FieldValue.increment(1) });
}

export async function deleteExpired(): Promise<number> {
  const db = getDb();
  const now = Timestamp.now();

  const snapshot = await db
    .collection(COLLECTION)
    .where("expiresAt", "<=", now)
    .get();

  if (snapshot.empty) return 0;

  // Batch delete (max 500 per batch)
  const batches: FirebaseFirestore.WriteBatch[] = [];
  let currentBatch = db.batch();
  let count = 0;

  snapshot.docs.forEach((doc, i) => {
    currentBatch.delete(doc.ref);
    count++;
    if ((i + 1) % 500 === 0) {
      batches.push(currentBatch);
      currentBatch = db.batch();
    }
  });

  batches.push(currentBatch);
  await Promise.all(batches.map((b) => b.commit()));

  return count;
}
