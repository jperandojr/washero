import { unstable_cache } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const SETTINGS_DEFAULTS = {
  phone_display: "(000) 000-0000",
  phone_href: "+639000000000",
  email: "hello@washero.com",
  hours_weekday: "Mon–Sat · 7 AM – 8 PM",
  hours_sunday: "Sun · 8 AM – 5 PM",
  whatsapp_number: "639000000000",
  messenger_username: "washero",
};

export const SETTINGS_TAG = "site-settings";

// Cached so the public site doesn't hit Supabase on every single request.
// Falls back to defaults if the site_settings migration hasn't been run
// yet, or the row doesn't exist for any other reason, so the public site
// never breaks while settings are being configured.
const fetchSettingsRow = unstable_cache(
  async () => {
    const { data } = await supabaseAdmin()
      .from("site_settings")
      .select("*")
      .eq("id", true)
      .maybeSingle();
    return data || null;
  },
  ["site-settings"],
  { revalidate: 300, tags: [SETTINGS_TAG] }
);

export async function getSiteSettings() {
  const row = await fetchSettingsRow();
  return { ...SETTINGS_DEFAULTS, ...(row || {}) };
}
