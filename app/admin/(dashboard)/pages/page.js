import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { deletePage } from "./actions";
import ConfirmDeleteForm from "../components/ConfirmDeleteForm";

export const dynamic = "force-dynamic";

export default async function PagesList() {
  const { data: pages } = await supabaseAdmin()
    .from("pages")
    .select("*")
    .order("updated_at", { ascending: false });

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Pages</h1>
          <p>Manage static site pages.</p>
        </div>
        <Link href="/admin/pages/new" className="btn btn-primary">
          New page
        </Link>
      </div>

      <div className="dash-card">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(!pages || pages.length === 0) && (
              <tr className="empty-row">
                <td colSpan={4}>No pages yet. Create your first one.</td>
              </tr>
            )}
            {pages?.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>/{p.slug}</td>
                <td>
                  <span className={`badge-pill ${p.published ? "on" : "off"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td>
                  <div className="row-actions">
                    <Link href={`/admin/pages/${p.id}`}>Edit</Link>
                    <ConfirmDeleteForm
                      action={deletePage}
                      id={p.id}
                      confirmText={`Delete "${p.title}"? This can't be undone.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
