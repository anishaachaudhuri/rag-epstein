import Badge from "@/components/ui/Badge";
import RelatedEvidence from "./RelatedEvidence";

export default function MetadataPanel() {
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
          <Badge>
            OCR_REPORT
          </Badge>
        </div>
      </div>

      <div className="mt-6">
        <div className="mono text-xs text-[var(--muted)]">
          CHUNKS
        </div>

        <div className="mt-2">
          2
        </div>
      </div>

      <div className="mt-6">
        <div className="mono text-xs text-[var(--muted)]">
          ENTITIES
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>Snowden</Badge>
          <Badge>Moscow</Badge>
          <Badge>Russia</Badge>
          <Badge>NSA</Badge>
          <Badge>Hong Kong</Badge>
        </div>
      </div>

      <div className="mt-6">
        <div className="mono text-xs text-[var(--muted)]">
          DATES
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>
            June 23, 2013
          </Badge>

          <Badge>
            February 2013
          </Badge>
        </div>
      </div>

      <div className="mt-8">
        <div className="mono text-xs text-[var(--muted)]">
          <RelatedEvidence />
        </div>

        <div className="mt-3 space-y-3">
          <div
            className="
              border
              border-[var(--border)]
              p-3
              text-sm
            "
          >
            IMAGES-005-HOUSE_OVERSIGHT_020401.txt
          </div>

          <div
            className="
              border
              border-[var(--border)]
              p-3
              text-sm
            "
          >
            IMAGES-005-HOUSE_OVERSIGHT_020429.txt
          </div>
        </div>
      </div>
    </div>
  );
}