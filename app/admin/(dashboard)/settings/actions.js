"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { SETTINGS_TAG } from "@/lib/settings";

export async function updateSettings(formData) {
  const payload = {
    id: true,
    phone_display: formData.get("phone_display")?.toString().trim(),
    phone_href: formData.get("phone_href")?.toString().trim(),
    email: formData.get("email")?.toString().trim(),
    hours_weekday: formData.get("hours_weekday")?.toString().trim(),
    hours_sunday: formData.get("hours_sunday")?.toString().trim(),
    whatsapp_number: formData.get("whatsapp_number")?.toString().trim(),
    messenger_username: formData.get("messenger_username")?.toString().trim(),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabaseAdmin()
    .from("site_settings")
    .upsert(payload, { onConflict: "id" });
  if (error) throw new Error(error.message);

  revalidateTag(SETTINGS_TAG);
  revalidatePath("/admin/settings");
  revalidatePath("/");
}
