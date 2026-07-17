import { cookies } from "next/headers";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { ADMIN_COOKIE, readSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const STATUS_LABEL = {
  new: "New",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

function formatPickupDate(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

async function getDashboardData() {
  const db = supabaseAdmin();
  const [newOrders, inProgress, completed, totalOrders, recent, pages, posts] = await Promise.all([
    db.from("orders").select("id", { count: "exact", head: true }).eq("status", "new"),
    db.from("orders").select("id", { count: "exact", head: true }).eq("status", "in_progress"),
    db.from("orders").select("id", { count: "exact", head: true }).eq("status", "completed"),
    db.from("orders").select("id", { count: "exact", head: true }),
    db.from("orders").select("*").order("created_at", { ascending: false }).limit(6),
    db.from("pages").select("id", { count: "exact", head: true }),
    db.from("blog_posts").select("id", { count: "exact", head: true }),
  ]);

  return {
    counts: {
      newOrders: newOrders.count ?? 0,
      inProgress: inProgress.count ?? 0,
      completed: completed.count ?? 0,
      totalOrders: totalOrders.count ?? 0,
      pages: pages.count ?? 0,
      posts: posts.count ?? 0,
    },
    recentOrders: recent.data ?? [],
  };
}

export default async function DashboardHome() {
  const cookieStore = await cookies();
  const session = await readSession(cookieStore.get(ADMIN_COOKIE)?.value);
  const isAdmin = session?.role === "admin";
  const { counts, recentOrders } = await getDashboardData();

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Dashboard</h1>
          <p>Order activity at a glance.</p>
        </div>
        <Link href="/admin/orders" className="btn btn-primary">
          View all orders
        </Link>
      </div>

      <div className="stat-grid">
        <Link href="/admin/orders" className="stat-card highlight">
          <div className="n">{counts.newOrders}</div>
          <div className="l">New pickup requests</div>
        </Link>
        <Link href="/admin/orders" className="stat-card">
          <div className="n">{counts.inProgress}</div>
          <div className="l">In progress</div>
        </Link>
        <Link href="/admin/orders" className="stat-card">
          <div className="n">{counts.completed}</div>
          <div className="l">Completed</div>
        </Link>
        <Link href="/admin/orders" className="stat-card">
          <div className="n">{counts.totalOrders}</div>
          <div className="l">Total orders</div>
        </Link>
      </div>

      <div className="dash-card">
        <div className="dash-card-head">
          <h2>Recent orders</h2>
          <Link href="/admin/orders">See all</Link>
        </div>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Service</th>
              <th>Pickup</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length === 0 && (
              <tr className="empty-row">
                <td colSpan={4}>No orders yet.</td>
              </tr>
            )}
            {recentOrders.map((o) => (
              <tr key={o.id}>
                <td title={o.name}>{o.name}</td>
                <td title={o.service}>{o.service}</td>
                <td>{formatPickupDate(o.pickup_date)} · {o.pickup_time}</td>
                <td>
                  <span className={`badge-pill status-${o.status}`}>
                    {STATUS_LABEL[o.status] || o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAdmin && (
        <div className="dash-secondary">
          <span className="dash-secondary-label">Content</span>
          <Link href="/admin/pages" className="mini-stat">
            <b>{counts.pages}</b> Pages
          </Link>
          <Link href="/admin/blog" className="mini-stat">
            <b>{counts.posts}</b> Blog posts
          </Link>
        </div>
      )}
    </>
  );
}
