import Link from "next/link";
type Props = {
  entity: {
    name: string;
    mentions: number;
    documents: string[];
    related_entities: {
      name: string;
      count: number;
    }[];
  };
};

export default function EntityInspector({
  entity,
}: Props) {
  return (
    <div
      className="
        h-full
        border
        border-[var(--border)]
        bg-[var(--panel)]
        p-6
        overflow-y-auto
      "
    >
      <div
        className="
          mono
          text-xs
          text-[var(--muted)]
        "
      >
        ENTITY DETAILS
      </div>

      <h2
        className="
          mt-4
          text-3xl
        "
      >
        {entity.name}
      </h2>

      <div className="mt-8">
        <div className="mono text-xs text-[var(--muted)]">
          TOTAL MENTIONS
        </div>

        <div className="mt-2 text-2xl">
          {entity.mentions}
        </div>
      </div>

      <div className="mt-8">
        <div className="mono text-xs text-[var(--muted)]">
          DOCUMENTS
        </div>

        <div className="mt-3 space-y-2">
          {entity.documents.map(
            (document) => (
              <div
                key={document}
                className="
                  text-sm
                  break-all
                "
              >
                {document}
              </div>
            )
          )}
        </div>
      </div>

      <div className="mt-8">
        <div className="mono text-xs text-[var(--muted)]">
          STRONGEST CONNECTIONS
        </div>

        <div className="mt-3 space-y-2">
          {entity.related_entities.map(
            (related) => (
              <Link
                key={related.name}
                href={`/entity-explorer?entity=${encodeURIComponent(
                  related.name
                )}`}
              >
                <div
                  className="
                    flex
                    justify-between
                    items-center
                    border
                    border-[var(--border)]
                    p-3
                    hover:bg-[var(--panel-2)]
                    cursor-pointer
                  "
                >
                  <span>
                    {related.name}
                  </span>

                  <span
                    className="
                      mono
                      text-xs
                      text-[var(--muted)]
                    "
                  >
                    {related.count}
                  </span>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}