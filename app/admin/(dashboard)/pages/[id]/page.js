import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { updatePage } from "../actions";
import PageForm from "../PageForm";

export const metadata = { title: "Edit page — WASHERO Admin" };

export default async function EditPagePage({ params }) {
  const { id } = await params;
  const { data: page } = await supabaseAdmin().from("pages").select("*").eq("id", id).single();
  if (!page) notFound();

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Edit page</h1>
        </div>
      </div>
      <PageForm action={updatePage.bind(null, id)} defaultValues={page} />
    </>
  );
}
