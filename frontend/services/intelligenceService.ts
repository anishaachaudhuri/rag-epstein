const API_URL =
  "http://localhost:8000";

export async function getDocumentIntelligence(
  id: number
) {
  const response = await fetch(
    `${API_URL}/api/documents/${id}/intelligence`,
    {
      cache: "no-store",
    }
  );

  return response.json();
}