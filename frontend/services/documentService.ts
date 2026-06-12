import { Document } from "@/types/document";
import { DocumentDetail }
  from "@/types/documentDetail";

const API_BASE =
  "http://127.0.0.1:8000/api";

export async function getDocuments(): Promise<Document[]> {
  const response = await fetch(
    `${API_BASE}/documents`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch documents"
    );
  }

  return response.json();
}

export async function getDocumentByFilename(
  filename: string
): Promise<DocumentDetail> {

  const response = await fetch(
    `${API_BASE}/documents/filename/${encodeURIComponent(
      filename
    )}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch document"
    );
  }

  return response.json();
}