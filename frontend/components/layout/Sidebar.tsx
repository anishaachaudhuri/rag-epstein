"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    label: "Evidence Locker",
    href: "/",
  },
  {
    label: "Document Intelligence",
    href: "/document-intelligence",
  },
  {
    label: "Entity Explorer",
    href: "/entity-explorer",
  },
  {
    label: "Inquiry & Analysis",
    href: "/inquiry-analysis",
  },
];

export default function Sidebar() {
  const pathname =
    usePathname();

  return (
    <aside
      className="
        w-72
        border-r
        border-[var(--border)]
        bg-[var(--panel)]
      "
    >
      <div className="p-5">
        <div
          className="
            mono
            text-xs
            uppercase
            tracking-widest
            text-[var(--muted)]
          "
        >
          INTELLIGENCE ARCHIVE
        </div>

        <h1
          className="
            mt-3
            newsreader
            text-xl
          "
        >
          Evidence Archive
        </h1>
      </div>

      <nav className="px-3 space-y-1">
        {items.map((item) => {

          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href ||
                pathname.startsWith(
                  item.href + "/"
                );

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`
                block
                w-full
                px-3
                py-3
                border
                text-sm

                ${
                  active
                    ? `
                      border-[var(--accent)]
                      bg-[var(--panel-2)]
                    `
                    : `
                      border-transparent
                      hover:border-[var(--border)]
                      hover:bg-[var(--panel-2)]
                    `
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}