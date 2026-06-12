export type DocumentRecord = {
  id: number;

  filename: string;

  documentType: string;

  chunks: number;

  entities: number;

  preview: string;

  entityList: string[];
};