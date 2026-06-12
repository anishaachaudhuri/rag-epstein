import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

import DocumentViewer from "@/components/intelligence/DocumentViewer";
import MetadataPanel from "@/components/intelligence/MetadataPanel";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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

          <p className="mt-2 text-sm text-[var(--muted)]">
            Document ID: {id}
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