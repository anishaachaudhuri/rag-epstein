import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

import EntityInspector from "@/components/metadata/EntityInspector";

import { entities } from "@/lib/entityMock";

export default async function EntityPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const entity =
    entities.find(
      (e) =>
        e.name.toLowerCase() ===
        decodeURIComponent(name).toLowerCase()
    ) || entities[0];

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
            Entity Explorer
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Investigating: {entity.name}
          </p>

          <div className="mt-8">
            <EntityInspector
              entity={entity}
            />
          </div>
        </div>
      </div>
    </main>
  );
}