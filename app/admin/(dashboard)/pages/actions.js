"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { slugify } from "@/lib/slugify";

export async function createPage(formData) {
  const title = formData.get("title")?.toString().trim();
  const rawSlug = formData.get("slug")?.toString().trim();
  const slug = slugify(rawSlug || title);
  const content = formData.get("content")?.toString() ?? "";
  const published = formData.get("published") === "on";

  const { error } = await supabaseAdmin()
    .from("pages")
    .insert({ title, slug, content, published });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

export async function updatePage(id, formData) {
  const title = formData.get("title")?.toString().trim();
  const rawSlug = formData.get("slug")?.toString().trim();
  const slug = slugify(rawSlug || title);
  const content = formData.get("content")?.toString() ?? "";
  const published = formData.get("published") === "on";

  const { error } = await supabaseAdmin()
    .from("pages")
    .update({ title, slug, content, published, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

export async function deletePage(formData) {
  const id = formData.get("id");
  const { error } = await supabaseAdmin().from("pages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/pages");
}
