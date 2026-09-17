import { Video } from "./video";

export type Tag = {
  id: string;
  name: string;
  slug: string;

  videos: Video[] | null;
};
