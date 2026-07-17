"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ALL_GROUPS = [
  {
    label: "Operations",
    links: [
      { href: "/admin", label: "Dashboard" },
      { href: "/admin/orders", label: "Orders" },
    ],
  },
  {
    label: "Content",
    adminOnly: true,
    links: [
      { href: "/admin/pages", label: "Pages" },
      { href: "/admin/blog", label: "Blog Posts" },
    ],
  },
  {
    label: "Admin",
    adminOnly: true,
    links: [
      { href: "/admin/settings", label: "Settings" },
      { href: "/admin/users", label: "Users" },
    ],
  },
];

export default function SidebarNav({ role }) {
  const pathname = usePathname();
  const groups = ALL_GROUPS.filter((group) => !group.adminOnly || role === "admin");

  return (
    <nav className="dash-nav">
      {groups.map((group) => (
        <div className="dash-nav-group" key={group.label}>
          <span className="dash-nav-label">{group.label}</span>
          {group.links.map((link) => {
            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={active ? "active" : ""}>
                {link.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
