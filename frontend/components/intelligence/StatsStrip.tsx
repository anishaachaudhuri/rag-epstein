export default function StatsStrip() {
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
          <div className="mono text-xs text-[var(--muted)]">
            DOCUMENTS
          </div>

          <div className="mt-1 text-xl">
            100
          </div>
        </div>

        <div>
          <div className="mono text-xs text-[var(--muted)]">
            CHUNKS
          </div>

          <div className="mt-1 text-xl">
            111
          </div>
        </div>

        <div>
          <div className="mono text-xs text-[var(--muted)]">
            ENTITIES
          </div>

          <div className="mt-1 text-xl">
            2485
          </div>
        </div>
      </div>
    </div>
  );
}