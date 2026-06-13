"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

export default function TopBar() {
  const router =
    useRouter();

  const [query, setQuery] =
    useState("");

  function handleSearch(
    e: React.KeyboardEvent<
      HTMLInputElement
    >
  ) {
    if (
      e.key === "Enter" &&
      query.trim()
    ) {
      router.push(
        `/search?q=${encodeURIComponent(
          query
        )}`
      );
    }
  }

  return (
    <div
      className="
        h-14
        border-b
        border-[var(--border)]
        flex
        items-center
        px-6
      "
    >
      <input
        value={query}
        onChange={(e) =>
          setQuery(
            e.target.value
          )
        }
        onKeyDown={
          handleSearch
        }
        placeholder="Search evidence..."
        className="
          w-full
          max-w-4xl
          bg-[var(--panel)]
          border
          border-[var(--border)]
          px-4
          py-2
          text-sm
          outline-none
        "
      />
    </div>
  );
}