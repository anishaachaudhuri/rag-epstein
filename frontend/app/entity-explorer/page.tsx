"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

import { entities } from "@/lib/entityMock";

import EntityList from "@/components/metadata/EntityList";
import EntityInspector from "@/components/metadata/EntityInspector";

export default function EntityExplorerPage() {
  const [selectedId, setSelectedId] =
    useState(1);

  const selectedEntity =
    entities.find(
      (entity) => entity.id === selectedId
    )!;

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

          <p
            className="
              mt-3
              text-[var(--muted)]
            "
          >
            Explore extracted entities and
            document relationships.
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
            <div>
              <EntityList
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>

            <div className="col-span-2">
              <EntityInspector
                entity={selectedEntity}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}