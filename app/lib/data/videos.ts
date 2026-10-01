"use server";

import { prisma } from "@/lib/prisma";

export async function getAllVideos() {
  return prisma.video.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getVideos(page: number) {
  const pageSize = 10;

  return prisma.video.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
}
