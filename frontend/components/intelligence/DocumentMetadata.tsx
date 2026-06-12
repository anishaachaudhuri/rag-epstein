import Link from "next/link";
type Props = {
  metadata: {
    document_type: string;
    chunk_count: number;
    entity_count: number;
    top_entities: string[];
  };
};

export default function DocumentMetadata({
  metadata,
}: Props) {
  return (
    <div
      className="
        border
        border-[var(--border)]
        bg-[var(--panel)]
        p-6
        h-[70vh]
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
        DOCUMENT METADATA
      </div>

      <div className="mt-6">
        <div className="mono text-xs text-[var(--muted)]">
          TYPE
        </div>

        <div className="mt-2">
          {metadata.document_type}
        </div>
      </div>

      <div className="mt-6">
        <div className="mono text-xs text-[var(--muted)]">
          CHUNKS
        </div>

        <div className="mt-2">
          {metadata.chunk_count}
        </div>
      </div>

      <div className="mt-6">
        <div className="mono text-xs text-[var(--muted)]">
          ENTITIES
        </div>

        <div className="mt-2">
          {metadata.entity_count}
        </div>
      </div>

      <div className="mt-8">
        <div className="mono text-xs text-[var(--muted)]">
          TOP ENTITIES
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {metadata.top_entities.map(
            (entity) => (
              <Link
                key={entity}
                href={`/entity-explorer?entity=${encodeURIComponent(entity)}`}
                className="
                  px-2
                  py-1
                  border
                  border-[var(--border)]
                  text-sm
                  hover:bg-[var(--panel-2)]
                  cursor-pointer
                "
              >
                {entity}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}