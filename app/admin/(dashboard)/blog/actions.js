"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { slugify } from "@/lib/slugify";

export async function createPost(formData) {
  const title = formData.get("title")?.toString().trim();
  const rawSlug = formData.get("slug")?.toString().trim();
  const slug = slugify(rawSlug || title);
  const excerpt = formData.get("excerpt")?.toString() ?? "";
  const content = formData.get("content")?.toString() ?? "";
  const published = formData.get("published") === "on";

  const { error } = await supabaseAdmin()
    .from("blog_posts")
    .insert({ title, slug, excerpt, content, published });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updatePost(id, formData) {
  const title = formData.get("title")?.toString().trim();
  const rawSlug = formData.get("slug")?.toString().trim();
  const slug = slugify(rawSlug || title);
  const excerpt = formData.get("excerpt")?.toString() ?? "";
  const content = formData.get("content")?.toString() ?? "";
  const published = formData.get("published") === "on";

  const { error } = await supabaseAdmin()
    .from("blog_posts")
    .update({ title, slug, excerpt, content, published, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deletePost(formData) {
  const id = formData.get("id");
  const { error } = await supabaseAdmin().from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
}
