"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createVideo() {
  // authentication
  // validation

  const videoUrl720 =
    "https://res.cloudinary.com/dmfqif8pz/video/upload/v1790357725/Futurama-Mini-medium_ino7rf.mp4";
  const previewVideoUrl144 =
    "https://res.cloudinary.com/dmfqif8pz/video/upload/v1790347737/Futurama-Mini-new_d2264i.mp4";

  await prisma.video.create({
    data: {
      title: "Futurama - Episode №3",
      description: "Description of the video.",
      thumbnailUrl:
        "https://res.cloudinary.com/dmfqif8pz/image/upload/v1738093438/temp/plsbxdj0rxlt5aeaw8ed.jpg",
      duration: 120,
      authorId: "df27552e-b0a7-4b75-a1fa-b08c40cbd5d7",
      color: "green",
      variants: {
        create: [
          { height: 720, url: videoUrl720, mimeType: "video/mp4" },
          { height: 144, url: previewVideoUrl144, mimeType: "video/mp4" },
        ],
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/watch");
}
