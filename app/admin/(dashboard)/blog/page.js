import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { deletePost } from "./actions";
import ConfirmDeleteForm from "../components/ConfirmDeleteForm";

export const dynamic = "force-dynamic";

export default async function BlogList() {
  const { data: posts } = await supabaseAdmin()
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Blog posts</h1>
          <p>Write and publish updates for your customers.</p>
        </div>
        <Link href="/admin/blog/new" className="btn btn-primary">
          New post
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
            {(!posts || posts.length === 0) && (
              <tr className="empty-row">
                <td colSpan={4}>No blog posts yet. Write your first one.</td>
              </tr>
            )}
            {posts?.map((p) => (
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
                    <Link href={`/admin/blog/${p.id}`}>Edit</Link>
                    <ConfirmDeleteForm
                      action={deletePost}
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
