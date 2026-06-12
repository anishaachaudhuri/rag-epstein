import { documentData } from "@/lib/documentMock";

export default function DocumentViewer() {
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
        DOCUMENT TEXT
      </div>

      <h2
        className="
          mt-4
          text-lg
          break-all
        "
      >
        {documentData.filename}
      </h2>

      <div
        className="
          mt-6
          whitespace-pre-line
          text-sm
          leading-7
        "
      >
        {documentData.text}
      </div>
    </div>
  );
}