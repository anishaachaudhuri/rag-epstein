const API_URL =
  "http://localhost:8000";

export async function getEntityDetails(
  name: string
) {
  const response = await fetch(
    `${API_URL}/api/entity/${encodeURIComponent(name)}`,
    {
      cache: "no-store",
    }
  );

  return response.json();
}