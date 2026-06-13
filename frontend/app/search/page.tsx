"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

import {
  searchDocuments,
} from "@/services/searchService";

export default function SearchPage() {
  const [query, setQuery] =
  useState("");

  const [results, setResults] =
    useState<any[]>([]);

  useEffect(() => {
    async function runSearch() {

        const params =
        new URLSearchParams(
            window.location.search
        );

        const q =
        params.get("q") || "";

        setQuery(q);

        if (!q) return;

        const response =
        await searchDocuments(q);

        setResults(
        response.results
        );
    }

    runSearch();
    }, []);

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
            Search Results
          </h1>

          <p
            className="
              mt-2
              text-[var(--muted)]
            "
          >
            Query: {query}
          </p>

          <div className="mt-8 space-y-4">
            {results.map(
              (
                result,
                index
              ) => (
                <Link
                  key={index}
                  href={`/document-intelligence/${result.filename}`}
                >
                  <div
                    className="
                      border
                      border-[var(--border)]
                      bg-[var(--panel)]
                      p-4
                      hover:bg-[var(--panel-2)]
                    "
                  >
                    <div className="font-medium">
                      {
                        result.filename
                      }
                    </div>

                    <div
                      className="
                        mt-2
                        text-sm
                        text-[var(--muted)]
                      "
                    >
                      Score:{" "}
                      {
                        result.score
                      }
                    </div>

                    <p
                      className="
                        mt-3
                        text-sm
                      "
                    >
                      {
                        result.text
                          .slice(
                            0,
                            300
                          )
                      }
                      ...
                    </p>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}