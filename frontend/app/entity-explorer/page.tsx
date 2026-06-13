"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

import EntitySearch from "@/components/metadata/EntitySearch";
import EntityList from "@/components/metadata/EntityList";
import EntityInspector from "@/components/metadata/EntityInspector";

import { getEntities } from "@/services/entityService";
import { getEntityDetails } from "@/services/entityDetailService";

export default function EntityExplorerPage() {
  const [entities, setEntities] =
    useState<any[]>([]);

  const [selectedName, setSelectedName] =
    useState("");

  const [details, setDetails] =
    useState<any>(null);

  const [search, setSearch] =
    useState("");

  const filteredEntities =
    entities.filter((entity) =>
      entity.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  useEffect(() => {
    async function loadEntities() {
      const data =
        await getEntities();

      setEntities(data);

      const params =
        new URLSearchParams(
          window.location.search
        );

      const entityFromUrl =
        params.get("entity");

      if (entityFromUrl) {
        setSelectedName(
          decodeURIComponent(
            entityFromUrl
          )
        );
      } else if (
        data.length > 0
      ) {
        setSelectedName(
          data[0].name
        );
      }
    }

    loadEntities();
  }, []);

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
    <main className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <div className="p-8 overflow-y-auto">
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

          <div className="mt-8">
            <EntitySearch
              value={search}
              onChange={setSearch}
            />

            <div
              className="
                mt-4
                overflow-x-auto
                overflow-y-hidden
              "
            >
              <EntityList
                entities={
                  filteredEntities
                }
                selectedName={
                  selectedName
                }
                onSelect={
                  setSelectedName
                }
              />
            </div>

            <div className="mt-6">
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