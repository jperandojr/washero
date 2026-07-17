import { supabaseAdmin } from "@/lib/supabase-admin";
import UploadForm from "./UploadForm";
import AssetCard from "./AssetCard";

export const dynamic = "force-dynamic";

export default async function MarketingPage() {
  const { data: assets } = await supabaseAdmin()
    .from("marketing_assets")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Marketing</h1>
          <p>Upload and manage marketing images and materials.</p>
        </div>
      </div>

      <UploadForm />

      {(!assets || assets.length === 0) && <p className="dash-empty">No marketing materials yet.</p>}

      <div className="asset-grid">
        {assets?.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </>
  );
}
