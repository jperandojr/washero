import "../admin.css";
import SidebarNav from "./components/SidebarNav";
import { logout } from "../login/actions";

export const metadata = { title: "WASHERO Admin" };

export default function DashboardLayout({ children }) {
  return (
    <div className="dash">
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <img src="/logo.png" alt="WASHERO" className="logo logo-white" style={{ height: "20px" }} />
        </div>
        <SidebarNav />
        <form action={logout} className="dash-logout">
          <button type="submit">Log out</button>
        </form>
      </aside>
      <main className="dash-main">{children}</main>
    </div>
  );
}
