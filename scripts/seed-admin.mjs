#!/usr/bin/env node
// One-off / recovery script: creates or updates an admin_users row.
//
// Usage:
//   node --env-file=.env.local scripts/seed-admin.mjs "Name" "email@example.com" ["password"]
//
// If password is omitted, the legacy ADMIN_PASSWORD env var is reused —
// this is how the original single-password login gets migrated onto a
// named account without ever choosing or displaying a new password.

import { hashPassword } from "../lib/auth.js";
import { supabaseAdmin } from "../lib/supabase-admin.js";

const [, , name, email, passwordArg] = process.argv;
const password = passwordArg || process.env.ADMIN_PASSWORD;

if (!name || !email || !password) {
  console.error(
    'Usage: node --env-file=.env.local scripts/seed-admin.mjs "Name" "email@example.com" ["password"]'
  );
  console.error("(If password is omitted, ADMIN_PASSWORD from the env file is used.)");
  process.exit(1);
}

const password_hash = await hashPassword(password);

const { error } = await supabaseAdmin()
  .from("admin_users")
  .upsert({ name, email: email.toLowerCase(), password_hash, role: "admin" }, { onConflict: "email" });

if (error) {
  console.error("Failed to seed admin user:", error.message);
  process.exit(1);
}

console.log(`Admin user "${email}" is ready. Log in at /admin/login.`);
