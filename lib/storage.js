import { supabaseAdmin } from "@/lib/supabase-admin";

export const MARKETING_BUCKET = "marketing";

let ensured = false;

// Creates the storage bucket on first use so no manual Supabase Storage
// setup step is required — unlike new tables, buckets can be created
// through the same service-role API the app already uses.
export async function ensureMarketingBucket() {
  if (ensured) return;
  const db = supabaseAdmin();
  const { data: bucket } = await db.storage.getBucket(MARKETING_BUCKET);
  if (!bucket) {
    await db.storage.createBucket(MARKETING_BUCKET, { public: true });
  }
  ensured = true;
}
