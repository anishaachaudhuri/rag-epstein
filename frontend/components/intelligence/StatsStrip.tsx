type Props = {
  documents: number;
  chunks: number;
  entities: number;
};

export default function StatsStrip({
  documents,
  chunks,
  entities,
}: Props) {
  return (
    <div
      className="
        mt-8
        border
        border-[var(--border)]
        bg-[var(--panel)]
        p-4
      "
    >
      <div className="flex gap-12">
        <div>
          <div
            className="
              mono
              text-xs
              text-[var(--muted)]
            "
          >
            DOCUMENTS
          </div>

          <div className="mt-1 text-xl">
            {documents}
          </div>
        </div>

        <div>
          <div
            className="
              mono
              text-xs
              text-[var(--muted)]
            "
          >
            CHUNKS
          </div>

          <div className="mt-1 text-xl">
            {chunks}
          </div>
        </div>

        <div>
          <div
            className="
              mono
              text-xs
              text-[var(--muted)]
            "
          >
            ENTITIES
          </div>

          <div className="mt-1 text-xl">
            {entities}
          </div>
        </div>
      </div>
    </div>
  );
}