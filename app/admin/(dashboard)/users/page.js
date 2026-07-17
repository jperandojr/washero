import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { deleteUser } from "./actions";
import ConfirmDeleteForm from "../components/ConfirmDeleteForm";

export const dynamic = "force-dynamic";

const ROLE_LABEL = { admin: "Admin", partner: "Partner" };

export default async function UsersList() {
  const { data: users } = await supabaseAdmin()
    .from("admin_users")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Users</h1>
          <p>Admins manage every setting; Partners see Dashboard and Orders only.</p>
        </div>
        <Link href="/admin/users/new" className="btn btn-primary">
          New user
        </Link>
      </div>

      <div className="dash-card">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(!users || users.length === 0) && (
              <tr className="empty-row">
                <td colSpan={4}>No users yet.</td>
              </tr>
            )}
            {users?.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge-pill role-${u.role}`}>{ROLE_LABEL[u.role] || u.role}</span>
                </td>
                <td>
                  <div className="row-actions">
                    <Link href={`/admin/users/${u.id}`}>Edit</Link>
                    <ConfirmDeleteForm
                      action={deleteUser}
                      id={u.id}
                      confirmText={`Delete "${u.name}"? This can't be undone.`}
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
