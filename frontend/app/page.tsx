import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

import StatsStrip from "@/components/intelligence/StatsStrip";

import EvidenceTable from "@/components/evidence/EvidenceTable";

import { getDocuments } from "@/services/documentService";
import { getStats } from "@/services/statsService";

export default async function Home() {
  const documents =
    await getDocuments();

  const stats =
    await getStats();

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

          <StatsStrip
            documents={
              stats.documents
            }
            chunks={
              stats.chunks
            }
            entities={
              stats.entities
            }
          />

          <EvidenceTable
            documents={documents}
          />
        </div>
      </div>
    </main>
  );
}