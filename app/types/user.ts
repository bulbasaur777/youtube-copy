import { Video } from "./video";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;

  videos: Video[] | null;
};
