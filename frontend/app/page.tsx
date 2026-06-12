import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

import StatsStrip from "@/components/intelligence/StatsStrip";

import EvidenceTable from "@/components/evidence/EvidenceTable";

import { getDocuments } from "@/services/documentService";

export default async function Home() {
  const documents =
    await getDocuments();

  return (
    <main className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <div className="p-8">
          <h2
            className="
              newsreader
              text-4xl
            "
          >
            Evidence Locker
          </h2>

          <p
            className="
              mt-3
              text-[var(--muted)]
            "
          >
            Investigative document archive
            and retrieval workspace.
          </p>

          <StatsStrip />

          <EvidenceTable
            documents={documents}
          />
        </div>
      </div>
    </main>
  );
}