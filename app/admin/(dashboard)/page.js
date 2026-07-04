import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

async function getCounts() {
  const db = supabaseAdmin();
  const [pages, posts, newOrders, totalOrders] = await Promise.all([
    db.from("pages").select("id", { count: "exact", head: true }),
    db.from("blog_posts").select("id", { count: "exact", head: true }),
    db.from("orders").select("id", { count: "exact", head: true }).eq("status", "new"),
    db.from("orders").select("id", { count: "exact", head: true }),
  ]);

  return {
    pages: pages.count ?? 0,
    posts: posts.count ?? 0,
    newOrders: newOrders.count ?? 0,
    totalOrders: totalOrders.count ?? 0,
  };
}

export default async function DashboardHome() {
  const counts = await getCounts();

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your site content and orders.</p>
        </div>
      </div>

      <div className="stat-grid">
        <Link href="/admin/orders" className="stat-card">
          <div className="n">{counts.newOrders}</div>
          <div className="l">New pickup requests</div>
        </Link>
        <Link href="/admin/orders" className="stat-card">
          <div className="n">{counts.totalOrders}</div>
          <div className="l">Total orders</div>
        </Link>
        <Link href="/admin/pages" className="stat-card">
          <div className="n">{counts.pages}</div>
          <div className="l">Pages</div>
        </Link>
        <Link href="/admin/blog" className="stat-card">
          <div className="n">{counts.posts}</div>
          <div className="l">Blog posts</div>
        </Link>
      </div>
    </>
  );
}
