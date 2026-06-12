import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

import DocumentViewer from "@/components/intelligence/DocumentViewer";
import MetadataPanel from "@/components/intelligence/MetadataPanel";

export default function DocumentIntelligencePage() {
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
              mt-3
              text-[var(--muted)]
            "
          >
            Deep inspection of extracted
            evidence and metadata.
          </p>

          <div
            className="
              mt-8
              grid
              grid-cols-3
              gap-6
              h-[75vh]
            "
          >
            <div className="col-span-2">
              <DocumentViewer />
            </div>

            <div>
              <MetadataPanel />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}