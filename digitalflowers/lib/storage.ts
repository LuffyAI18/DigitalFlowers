/**
 * Local JSON file-based storage for development (replaces MongoDB).
 * Stores bouquets in a JSON file so it works without any database setup.
 * For production, switch to MongoDB by setting USE_MONGODB=true in .env.local.
 */

import fs from "fs";
import path from "path";

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

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "bouquets.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readAll(): BouquetRecord[] {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as BouquetRecord[];
  } catch {
    return [];
  }
}

function writeAll(records: BouquetRecord[]) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), "utf-8");
}

// ── Public API ──

export function createBouquet(data: Omit<BouquetRecord, "createdAt">): BouquetRecord {
  const records = readAll();
  const record: BouquetRecord = {
    ...data,
    createdAt: new Date().toISOString(),
  };
  records.push(record);
  writeAll(records);
  return record;
}

export function findBouquetBySlug(slug: string): BouquetRecord | null {
  const records = readAll();
  const now = new Date();
  const found = records.find(
    (r) => r.slug === slug && r.published && new Date(r.expiresAt) > now
  );
  return found ?? null;
}

export function incrementShareCount(slug: string): void {
  const records = readAll();
  const idx = records.findIndex((r) => r.slug === slug);
  if (idx !== -1) {
    records[idx].shareCount += 1;
    writeAll(records);
  }
}

export function deleteExpired(): number {
  const records = readAll();
  const now = new Date();
  const kept = records.filter((r) => new Date(r.expiresAt) > now);
  const deletedCount = records.length - kept.length;
  if (deletedCount > 0) {
    writeAll(kept);
  }
  return deletedCount;
}
