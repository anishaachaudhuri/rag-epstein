import Link from "next/link";
import { DocumentRecord } from "@/types/document";
import Badge from "@/components/ui/Badge";

type Props = {
  document: DocumentRecord;
};

export default function EvidenceInspector({
  document,
}: Props) {
  return (
    <div
      className="
        h-full
        border
        border-[var(--border)]
        bg-[var(--panel)]
        p-5
      "
    >
      <div className="mono text-xs text-[var(--muted)]">
        DOCUMENT INSPECTOR
      </div>

      <h3
        className="
          mt-4
          text-lg
          break-all
        "
      >
        {document.filename}
      </h3>

      <div className="mt-6 space-y-5">
        <div>
          <div className="mono text-xs text-[var(--muted)]">
            TYPE
          </div>

          <div className="mt-2">
            <Badge>
              {document.documentType}
            </Badge>
          </div>
        </div>

        <div>
          <div className="mono text-xs text-[var(--muted)]">
            CHUNKS
          </div>

          <div>{document.chunks}</div>
        </div>

        <div>
          <div className="mono text-xs text-[var(--muted)]">
            ENTITIES
          </div>

          <div>{document.entities}</div>
        </div>

        <div>
          <div className="mono text-xs text-[var(--muted)]">
            KEY ENTITIES
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {document.entityList.map(
              (entity) => (
                <Link
                  key={entity}
                  href={`/entity-explorer/${entity}`}
                >
                  <Badge>
                    {entity}
                  </Badge>
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="mono text-xs text-[var(--muted)]">
          PREVIEW
        </div>

        <p className="mt-3 text-sm leading-6">
          {document.preview}
        </p>
      </div>
    </div>
  );
}