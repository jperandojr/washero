"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  DUMMY_PASSWORD_HASH,
  SESSION_COOKIE_MAX_AGE,
  createSessionToken,
  verifyPassword,
} from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function login(formData) {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString() || "";

  if (!email || !password) {
    redirect("/admin/login?error=1");
  }

  const { data: user } = await supabaseAdmin()
    .from("admin_users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  // Always run verifyPassword, even for an unknown email, so the response
  // time doesn't reveal whether an account exists.
  const valid = await verifyPassword(password, user?.password_hash || DUMMY_PASSWORD_HASH);
  if (!user || !valid) {
    redirect("/admin/login?error=1");
  }

  const token = await createSessionToken({ uid: user.id, role: user.role, name: user.name });
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_COOKIE_MAX_AGE,
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
