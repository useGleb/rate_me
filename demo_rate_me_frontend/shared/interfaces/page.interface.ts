export type IRatingCategory = {
  id: number;
  name: string;
  avg?: number;
};

export type IPageData = {
  id: number;
  description: string;
  name: string;
  image_path: string;
  categories: IRatingCategory[];
  createdAt: Date;
};

export type FileUploadObject = {
  file?: File;
  raw?: string | ArrayBuffer;
};
