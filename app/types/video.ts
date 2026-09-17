import { Tag } from "./tag";
import { User } from "./user";

export type Video = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;

  authorId: string;
  author: User;
  tags: Tag[] | null;
};
