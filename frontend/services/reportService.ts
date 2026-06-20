const API_URL =
  "http://localhost:8000/api";

export async function exportReport(
  query: string
) {

  const response =
    await fetch(
      `${API_URL}/report`,
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
      "Failed to export report"
    );
  }

  return response.blob();
}