"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

import EntityList from "@/components/metadata/EntityList";
import EntityInspector from "@/components/metadata/EntityInspector";

import { getEntities } from "@/services/entityService";
import { getEntityDetails } from "@/services/entityDetailService";
import { useSearchParams } from "next/navigation";

export default function EntityExplorerPage() {
  const [entities, setEntities] =
    useState<any[]>([]);

  const [selectedName, setSelectedName] =
    useState("");

  const [details, setDetails] =
    useState<any>(null);
  const searchParams =
  useSearchParams();

  const entityFromUrl =
  searchParams.get("entity");

  useEffect(() => {
    async function loadEntities() {
      const data =
        await getEntities();

      setEntities(data);

      if (entityFromUrl) {
        setSelectedName(
          entityFromUrl
        );
      }
      else if (data.length > 0) {
        setSelectedName(
          data[0].name
        );
      }
    }

    loadEntities();
  }, [entityFromUrl]);

  useEffect(() => {
    async function loadDetails() {
      if (!selectedName) return;

      const data =
        await getEntityDetails(
          selectedName
        );

      setDetails(data);
    }

    loadDetails();
}, [selectedName]);

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
                entities={entities}
                selectedName={
                  selectedName
                }
                onSelect={
                  setSelectedName
                }
              />
            </div>

            <div className="col-span-2">
              {details && (
                <EntityInspector
                  entity={details}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}