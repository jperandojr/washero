"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { MARKETING_BUCKET, ensureMarketingBucket } from "@/lib/storage";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
]);
const MAX_SIZE = 15 * 1024 * 1024; // 15MB — matches next.config.mjs serverActions.bodySizeLimit

export async function uploadAsset(formData) {
  const title = formData.get("title")?.toString().trim();
  const category = formData.get("category")?.toString().trim() || null;
  const file = formData.get("file");

  if (!title || !(file instanceof File) || file.size === 0) {
    throw new Error("A title and a file are required.");
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Unsupported file type. Upload an image or PDF.");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("File is too large (15MB max).");
  }

  await ensureMarketingBucket();
  const db = supabaseAdmin();

  const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await db.storage
    .from(MARKETING_BUCKET)
    .upload(path, file, { contentType: file.type });
  if (uploadError) throw new Error(uploadError.message);

  const { data: publicUrlData } = db.storage.from(MARKETING_BUCKET).getPublicUrl(path);

  const { error: insertError } = await db.from("marketing_assets").insert({
    title,
    category,
    file_path: path,
    file_url: publicUrlData.publicUrl,
    file_type: file.type,
    file_size: file.size,
  });
  if (insertError) throw new Error(insertError.message);

  revalidatePath("/admin/marketing");
}

export async function deleteAsset(formData) {
  const id = formData.get("id");
  const db = supabaseAdmin();

  const { data: asset } = await db
    .from("marketing_assets")
    .select("file_path")
    .eq("id", id)
    .maybeSingle();
  if (asset?.file_path) {
    await db.storage.from(MARKETING_BUCKET).remove([asset.file_path]);
  }

  const { error } = await db.from("marketing_assets").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/marketing");
}
