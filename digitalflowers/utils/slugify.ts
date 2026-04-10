import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 6);

/**
 * Generate a unique, readable slug for a bouquet.
 * Format: digitalflower-<timestamp>-<nanoid(6)>
 */
export function generateSlug(): string {
  const timestamp = Date.now().toString(36); // base36 timestamp
  const suffix = nanoid();
  return `digitalflower-${timestamp}-${suffix}`;
}

/**
 * Build the full share URL for a bouquet
 */
export function buildShareUrl(slug: string): string {
  const base = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  return `${base}/bouquet/${slug}`;
}
