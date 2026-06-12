import EvidenceRow from "./EvidenceRow";

import { Document } from "@/types/document";

type Props = {
  documents: Document[];
};

export default function EvidenceTable({
  documents,
}: Props) {
  return (
    <div
      className="
        mt-8
        border
        border-[var(--border)]
        bg-[var(--panel)]
      "
    >
      <table className="w-full">
        <thead>
          <tr
            className="
              border-b
              border-[var(--border)]
              text-left
            "
          >
            <th className="p-4 mono text-xs">
              FILENAME
            </th>

            <th className="p-4 mono text-xs">
              TYPE
            </th>

            <th className="p-4 mono text-xs">
              ID
            </th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc) => (
            <EvidenceRow
              key={doc.id}
              filename={doc.filename}
              documentType={
                doc.document_type
              }
              chunks={doc.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}