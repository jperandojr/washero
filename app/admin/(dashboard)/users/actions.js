"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { ADMIN_COOKIE, hashPassword, readSession } from "@/lib/auth";

function normalizeRole(formData) {
  return formData.get("role")?.toString() === "admin" ? "admin" : "partner";
}

export async function createUser(formData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString() || "";
  const role = normalizeRole(formData);

  if (!name || !email || password.length < 8) {
    throw new Error("Name, email, and a password of at least 8 characters are required.");
  }

  const password_hash = await hashPassword(password);
  const { error } = await supabaseAdmin().from("admin_users").insert({ name, email, password_hash, role });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function updateUser(id, formData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString() || "";
  const role = normalizeRole(formData);

  if (!name || !email) {
    throw new Error("Name and email are required.");
  }

  const payload = { name, email, role };
  if (password) {
    if (password.length < 8) throw new Error("Password must be at least 8 characters.");
    payload.password_hash = await hashPassword(password);
  }

  const { error } = await supabaseAdmin().from("admin_users").update(payload).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUser(formData) {
  const id = formData.get("id");

  const cookieStore = await cookies();
  const session = await readSession(cookieStore.get(ADMIN_COOKIE)?.value);
  if (session?.uid === id) {
    throw new Error("You cannot delete your own account while logged in.");
  }

  const { data: target } = await supabaseAdmin().from("admin_users").select("role").eq("id", id).maybeSingle();
  if (target?.role === "admin") {
    const { count } = await supabaseAdmin()
      .from("admin_users")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) <= 1) {
      throw new Error("Cannot delete the last remaining admin account.");
    }
  }

  const { error } = await supabaseAdmin().from("admin_users").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/users");
}
