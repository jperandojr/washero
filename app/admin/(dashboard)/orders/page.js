import { supabaseAdmin } from "@/lib/supabase-admin";
import StatusSelect from "./StatusSelect";

export const dynamic = "force-dynamic";

function formatPickupDate(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default async function OrdersList() {
  const { data: orders } = await supabaseAdmin()
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Orders</h1>
          <p>Pickup requests submitted from the booking form.</p>
        </div>
      </div>

      <div className="dash-card">
        <table className="dash-table dash-table-fixed">
          <colgroup>
            <col style={{ width: "13%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "17%" }} />
            <col style={{ width: "9%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "8%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Service</th>
              <th>Pickup</th>
              <th>Load</th>
              <th>Notes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(!orders || orders.length === 0) && (
              <tr className="empty-row">
                <td colSpan={8}>No orders yet.</td>
              </tr>
            )}
            {orders?.map((o) => (
              <tr key={o.id}>
                <td title={o.name}>{o.name}</td>
                <td title={o.phone}>{o.phone}</td>
                <td title={o.address}>{o.address}</td>
                <td title={o.service}>{o.service}</td>
                <td title={`${o.pickup_date} · ${o.pickup_time}`}>
                  {formatPickupDate(o.pickup_date)} · {o.pickup_time}
                </td>
                <td title={o.load_size || ""}>{o.load_size || "—"}</td>
                <td title={o.notes || ""}>{o.notes || "—"}</td>
                <td>
                  <StatusSelect id={o.id} status={o.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
