"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

type CreateVideoInput = {
  title: string;
  description: string;
  videoUrl: string;
  previewVideoUrl: string | null;
  thumbnailUrl: string | null;
  duration: number;
};

export async function createVideo() {
  // authentication
  // validation

  await prisma.video.create({
    data: {
      title: "Futurama - Episode №3",
      description: "Description of the video.",
      videoUrl:
        "https://res.cloudinary.com/dmfqif8pz/video/upload/v1790357725/Futurama-Mini-medium_ino7rf.mp4",
      previewVideoUrl:
        "https://res.cloudinary.com/dmfqif8pz/video/upload/v1790347737/Futurama-Mini-new_d2264i.mp4",
      thumbnailUrl:
        "https://res.cloudinary.com/dmfqif8pz/image/upload/v1738093438/temp/plsbxdj0rxlt5aeaw8ed.jpg",
      duration: 120,
      authorId: "df27552e-b0a7-4b75-a1fa-b08c40cbd5d7",
      color: "green",
    },
  });

  revalidatePath("/");
}
