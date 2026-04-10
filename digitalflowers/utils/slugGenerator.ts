import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 8);

export function generateSlug(): string {
  const timestamp = Date.now().toString(36); // base-36 timestamp, compact
  const suffix = nanoid();
  return `digitalflower-${timestamp}-${suffix}`;
}

export function generateShareUrl(slug: string, baseUrl?: string): string {
  const base = baseUrl || process.env.BASE_URL || "http://localhost:3000";
  return `${base}/bouquet/${slug}`;
}
