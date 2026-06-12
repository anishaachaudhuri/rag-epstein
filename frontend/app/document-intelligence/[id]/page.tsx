import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

import DocumentMetadata from "@/components/intelligence/DocumentMetadata";

import {
  getDocumentByFilename,
} from "@/services/documentService";

import {
  getDocumentIntelligence,
} from "@/services/intelligenceService";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } =
    await params;

  const document =
    await getDocumentByFilename(id);

  const metadata =
    await getDocumentIntelligence(
      document.id
    );

  return (
    <main className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <div className="p-8">
          <h1
            className="
              newsreader
              text-4xl
            "
          >
            Document Intelligence
          </h1>

          <p
            className="
              mt-2
              mono
              text-xs
              text-[var(--muted)]
            "
          >
            {document.filename}
          </p>

          <div
            className="
              mt-8
              grid
              grid-cols-3
              gap-6
            "
          >
            <div className="col-span-2">
              <div
                className="
                  border
                  border-[var(--border)]
                  bg-[var(--panel)]
                  p-6
                  h-[70vh]
                  overflow-y-auto
                "
              >
                <pre
                  className="
                    whitespace-pre-wrap
                    text-sm
                    leading-7
                  "
                >
                  {document.raw_text}
                </pre>
              </div>
            </div>

            <div>
              <DocumentMetadata
                metadata={metadata}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}