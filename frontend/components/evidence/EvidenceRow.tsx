import Link from "next/link";

type Props = {
  filename: string;
  documentType: string;
  chunks: number;
  entities: number;
  onClick: () => void;
};

export default function EvidenceRow({
  filename,
  documentType,
  chunks,
  entities,
  onClick,
}: Props) {
  return (
    <tr
      onClick={onClick}
      className="
        border-b
        border-[var(--border)]
        hover:bg-[var(--panel-2)]
        cursor-pointer
      "
    >
      <td className="p-4 mono text-sm">
        <Link href={`/document-intelligence/${filename}`}>
          {filename}
        </Link>
      </td>

      <td className="p-4">
        {documentType}
      </td>

      <td className="p-4">
        {chunks}
      </td>

      <td className="p-4">
        {entities}
      </td>
    </tr>
  );
}