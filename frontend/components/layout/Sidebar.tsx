import Link from "next/link";

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
    label: "Synthetic Analysis",
    href: "/synthetic-analysis",
  },
  {
    label: "Entity Explorer",
    href: "/entity-explorer",
  },
];

export default function Sidebar() {
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
            text-xs
            mono
            uppercase
            tracking-widest
            text-[var(--muted)]
          "
        >
          Intelligence System
        </div>

        <h1
          className="
            mt-3
            text-xl
            newsreader
          "
        >
          Evidence Archive
        </h1>
      </div>

      <nav className="px-3 space-y-1">
        {items.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            className={`
              block
              w-full
              text-left
              px-3
              py-3
              border
              text-sm

              ${
                index === 0
                  ? `
                    bg-[var(--panel-2)]
                    border-[var(--accent)]
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
        ))}
      </nav>
    </aside>
  );
}