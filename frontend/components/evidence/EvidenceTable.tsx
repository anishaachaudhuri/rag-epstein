import EvidenceRow from "./EvidenceRow";

import { documents } from "@/lib/mockData";

type Props = {
  onSelect: (id: number) => void;
};

export default function EvidenceTable({
  onSelect,
}: Props) {
  return (
    <div
      className="
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
              CHUNKS
            </th>

            <th className="p-4 mono text-xs">
              ENTITIES
            </th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc) => (
            <EvidenceRow
              key={doc.id}
              filename={doc.filename}
              documentType={doc.documentType}
              chunks={doc.chunks}
              entities={doc.entities}
              onClick={() =>
                onSelect(doc.id)
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}