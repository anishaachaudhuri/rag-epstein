const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

export async function searchDocuments(
  query: string
) {
  const response =
    await fetch(
      `${API_URL}/api/search`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      }
    );

  if (!response.ok) {
    throw new Error(
      "Search failed"
    );
  }

  return response.json();
}