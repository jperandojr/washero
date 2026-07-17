import { cookies } from "next/headers";
import "../admin.css";
import SidebarNav from "./components/SidebarNav";
import { logout } from "../login/actions";
import { ADMIN_COOKIE, readSession } from "@/lib/auth";

export const metadata = { title: "WASHERO Admin" };

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const session = await readSession(cookieStore.get(ADMIN_COOKIE)?.value);

  return (
    <div className="dash">
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <img src="/logo.png" alt="WASHERO" className="logo logo-white" style={{ height: "20px" }} />
        </div>
        <SidebarNav role={session?.role} />
        <div className="dash-user">
          <div className="dash-user-name">{session?.name}</div>
          <div className="dash-user-role">{session?.role === "admin" ? "Admin" : "Partner"}</div>
        </div>
        <form action={logout} className="dash-logout">
          <button type="submit">Log out</button>
        </form>
      </aside>
      <main className="dash-main">{children}</main>
    </div>
  );
}
