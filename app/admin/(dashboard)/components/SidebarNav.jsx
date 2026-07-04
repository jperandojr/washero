"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/blog", label: "Blog Posts" },
  { href: "/admin/orders", label: "Orders" },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="dash-nav">
      {links.map((link) => {
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
    </nav>
  );
}
