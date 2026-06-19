const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

export async function runSynthesis(
  query: string
) {
  const response =
    await fetch(
      `${API_URL}/api/synthesis`,
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
      "Synthesis failed"
    );
  }

  return response.json();
}