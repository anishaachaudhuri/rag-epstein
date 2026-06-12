import Link from "next/link";
import { documentData } from "@/lib/documentMock";

export default function RelatedEvidence() {
  return (
    <div className="mt-8">
      <div
        className="
          mono
          text-xs
          text-[var(--muted)]
        "
      >
        RELATED EVIDENCE
      </div>

      <div className="mt-3 space-y-3">
        {documentData.relatedDocuments.map(
          (doc) => (
            <Link
              key={doc.filename}
              href={`/document-intelligence/${encodeURIComponent(
                doc.filename
              )}`}
              className="
                block
                border
                border-[var(--border)]
                p-3
                hover:bg-[var(--panel-2)]
                cursor-pointer
              "
            >
              <div
                className="
                  text-sm
                  break-all
                "
              >
                {doc.filename}
              </div>

              <div
                className="
                  mono
                  text-xs
                  mt-2
                  text-[var(--muted)]
                "
              >
                Similarity: {doc.similarity}
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}