import { Entity } from "@/types/entity";

const API_BASE =
  "http://127.0.0.1:8000/api";

export async function getEntities(): Promise<Entity[]> {

  const response = await fetch(
    `${API_BASE}/entities`,
    {
      cache: "no-store",
    }
  );

  return response.json();
}