"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function createOrder(formData) {
  const payload = {
    name: formData.get("name")?.toString().trim(),
    phone: formData.get("phone")?.toString().trim(),
    address: formData.get("address")?.toString().trim(),
    service: formData.get("service")?.toString(),
    pickup_date: formData.get("date")?.toString(),
    pickup_time: formData.get("time")?.toString(),
    load_size: formData.get("load")?.toString() || null,
    notes: formData.get("notes")?.toString() || null,
  };

  const { error } = await supabaseAdmin().from("orders").insert(payload);

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
