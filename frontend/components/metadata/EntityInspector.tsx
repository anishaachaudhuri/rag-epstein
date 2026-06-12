import Badge from "@/components/ui/Badge";

type Props = {
  entity: {
    name: string;
    label: string;
    documents: number;
    chunks: number;
    related: string[];
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

      <div className="mt-6">
        <Badge>
          {entity.label}
        </Badge>
      </div>

      <div className="mt-8">
        <div className="mono text-xs text-[var(--muted)]">
          DOCUMENTS
        </div>

        <div className="mt-2 text-xl">
          {entity.documents}
        </div>
      </div>

      <div className="mt-6">
        <div className="mono text-xs text-[var(--muted)]">
          CHUNKS
        </div>

        <div className="mt-2 text-xl">
          {entity.chunks}
        </div>
      </div>

      <div className="mt-8">
        <div className="mono text-xs text-[var(--muted)]">
          CO-OCCURRING ENTITIES
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {entity.related.map(
            (relatedEntity) => (
              <Badge
                key={relatedEntity}
              >
                {relatedEntity}
              </Badge>
            )
          )}
        </div>
      </div>
    </div>
  );
}