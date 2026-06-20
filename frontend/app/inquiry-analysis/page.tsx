"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import Link from "next/link";

import {
  runSynthesis,
} from "@/services/synthesisService";

import {
  exportReport
} from "@/services/reportService";

export default function InquiryAnalysisPage() {

  const [query, setQuery] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  async function handleSubmit() {

    if (!query.trim()) return;

    setLoading(true);

    try {

      const data =
        await runSynthesis(
          query
        );

      setResult(data);

    } finally {

      setLoading(false);

    }
  }

  async function handleExport() {

    if (!query.trim()) return;

    try {

      const blob =
        await exportReport(
          query
        );

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        "investigative_report.pdf";

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

      window.URL.revokeObjectURL(
        url
      );

    } catch (error) {

      console.error(
        error
      );

      alert(
        "Failed to export report."
      );

    }
  }

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
            Inquiry & Analysis
          </h1>

          <p
            className="
              mt-3
              text-[var(--muted)]
            "
          >
            Generate intelligence reports
            from retrieved evidence.
          </p>

          <div className="mt-8 flex gap-3">

            <input
              value={query}
              onChange={(e) =>
                setQuery(
                  e.target.value
                )
              }
              placeholder="How was Trump involved with Epstein?"
              className="
                flex-1
                border
                border-[var(--border)]
                bg-[var(--panel)]
                px-4
                py-3
              "
            />

            <button
              onClick={
                handleSubmit
              }
              className="
                px-5
                border
                border-[var(--border)]
                bg-[var(--panel)]
              "
            >
              Generate Findings
            </button>

            {result && (

              <button
                onClick={
                  handleExport
                }
                className="
                  px-5
                  border
                  border-[var(--border)]
                  bg-[var(--panel)]
                "
              >
                Export Report
              </button>

            )}

          </div>

          {loading && (

            <div className="mt-6">
              Generating report...
            </div>

          )}

          {result && (

            <div
              className="
                mt-8
                border
                border-[var(--border)]
                bg-[var(--panel)]
                p-6
              "
            >

              <div
                className="
                  mono
                  text-xs
                  text-[var(--muted)]
                "
              >
                ANALYSIS
              </div>

              <div className="mt-6">

                <div
                  className="
                    mono
                    text-xs
                    text-[var(--muted)]
                  "
                >
                  EXECUTIVE SUMMARY
                </div>

                <p className="mt-3 leading-7">
                  {result.analysis.summary}
                </p>

              </div>

              <div className="mt-8">

                <div
                  className="
                    mono
                    text-xs
                    text-[var(--muted)]
                  "
                >
                  KEY FINDINGS
                </div>

                <div className="mt-4 space-y-6">

                  {result.analysis.key_findings.map(
                    (
                      finding: any,
                      index: number
                    ) => (

                      <div
                        key={index}
                        className="
                          border
                          border-[var(--border)]
                          p-4
                        "
                      >

                        <div>
                          • {finding.finding}
                        </div>

                        {finding.sources?.length > 0 && (

                          <div className="mt-4">

                            <div
                              className="
                                mono
                                text-xs
                                text-[var(--muted)]
                              "
                            >
                              SOURCES
                            </div>

                            <div className="mt-2 space-y-1">

                              {finding.sources.map(
                                (
                                  source: any,
                                  sourceIndex: number
                                ) => (

                                  <Link
                                    key={sourceIndex}
                                    href={`/document-intelligence/${source.filename}`}
                                    className="
                                      block
                                      text-sm
                                      hover:underline
                                    "
                                  >
                                    {source.filename}
                                    {" "}
                                    (chunk {source.chunk_index})
                                  </Link>

                                )
                              )}

                            </div>

                          </div>

                        )}

                      </div>

                    )
                  )}

                </div>

              </div>

              <div className="mt-8">

                <div
                  className="
                    mono
                    text-xs
                    text-[var(--muted)]
                  "
                >
                  TIMELINE
                </div>

                <div className="mt-4 space-y-4">

                  {result.analysis.timeline?.map(
                    (
                      event: any,
                      index: number
                    ) => (

                      <div
                        key={index}
                        className="
                          border
                          border-[var(--border)]
                          p-4
                        "
                      >

                        <div className="font-medium">
                          {event.date}
                        </div>

                        <div className="mt-2">
                          {event.event}
                        </div>

                        {event.sources?.length > 0 && (

                          <div className="mt-3">

                            <div
                              className="
                                mono
                                text-xs
                                text-[var(--muted)]
                              "
                            >
                              SOURCES
                            </div>

                            {event.sources.map(
                              (
                                source: any,
                                sourceIndex: number
                              ) => (

                                <Link
                                  key={sourceIndex}
                                  href={`/document-intelligence/${source.filename}`}
                                  className="
                                    block
                                    mt-1
                                    text-sm
                                    hover:underline
                                  "
                                >
                                  {source.filename}
                                </Link>

                              )
                            )}

                          </div>

                        )}

                      </div>

                    )
                  )}

                </div>

              </div>

              <div className="mt-8">

                <div
                  className="
                    mono
                    text-xs
                    text-[var(--muted)]
                  "
                >
                  IMPORTANT ENTITIES
                </div>

                <div className="mt-3 flex flex-wrap gap-2">

                  {result.analysis.important_entities.map(
                    (
                      entity: string
                    ) => (

                      <Link
                        key={entity}
                        href={`/entity-explorer?entity=${encodeURIComponent(entity)}`}
                        className="
                          px-3
                          py-1
                          border
                          border-[var(--border)]
                          hover:bg-[var(--panel-2)]
                        "
                      >
                        {entity}
                      </Link>

                    )
                  )}

                </div>

              </div>

              <div className="mt-8">

                <div
                  className="
                    mono
                    text-xs
                    text-[var(--muted)]
                  "
                >
                  UNCERTAINTIES
                </div>

                <ul className="mt-3 space-y-2">

                  {result.analysis.uncertainties.map(
                    (
                      item: string,
                      index: number
                    ) => (

                      <li key={index}>
                        • {item}
                      </li>

                    )
                  )}

                </ul>

              </div>

              <div className="mt-8">

                <div
                  className="
                    mono
                    text-xs
                    text-[var(--muted)]
                  "
                >
                  SOURCES
                </div>

                <div className="mt-3">

                  {result.sources.map(
                    (
                      source: any,
                      index: number
                    ) => (

                      <Link
                        key={index}
                        href={`/document-intelligence/${source.filename}`}
                        className="
                          block
                          mt-2
                          hover:underline
                        "
                      >
                        {source.filename}
                      </Link>

                    )
                  )}

                </div>

              </div>

            </div>

          )}

        </div>
      </div>
    </main>
  );
}