"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function updateOrderStatus(id, formData) {
  const status = formData.get("status");
  const { error } = await supabaseAdmin().from("orders").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}
