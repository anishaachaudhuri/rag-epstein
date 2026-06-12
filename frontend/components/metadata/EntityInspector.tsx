import Badge from "@/components/ui/Badge";

type Props = {
  entity: {
    name: string;
    mentions: number;
    documents: string[];
    related_entities: string[];
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
          RELATED ENTITIES
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {entity.related_entities.map(
            (related) => (
              <Badge key={related}>
                {related}
              </Badge>
            )
          )}
        </div>
      </div>
    </div>
  );
}