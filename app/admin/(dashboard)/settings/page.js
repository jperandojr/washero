import { getSiteSettings } from "@/lib/settings";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Settings</h1>
          <p>Contact info and hours shown across the public site.</p>
        </div>
      </div>
      <SettingsForm defaultValues={settings} />
    </>
  );
}
