"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const groups = [
  {
    label: "Operations",
    links: [
      { href: "/admin", label: "Dashboard" },
      { href: "/admin/orders", label: "Orders" },
      { href: "/admin/settings", label: "Settings" },
    ],
  },
  {
    label: "Content",
    links: [
      { href: "/admin/pages", label: "Pages" },
      { href: "/admin/blog", label: "Blog Posts" },
    ],
  },
];

export default function SidebarNav() {
  const pathname = usePathname();

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
