import { prisma } from "@/libs/prisma";

export async function getAllTags() {
  return prisma.tag.findMany({
    include: {
      videos: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}
