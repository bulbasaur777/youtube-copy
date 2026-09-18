import { prisma } from "@/lib/prisma";

export async function getAllTags() {
  return prisma.tag.findMany({
    select: {
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}
