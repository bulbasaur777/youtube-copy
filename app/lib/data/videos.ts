"use server";

import { prisma } from "@/lib/prisma";

export async function getAllVideos() {
  return prisma.video.findMany({
    include: {
      author: true,
      variants: true,
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
      variants: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
}

export async function getVideoById(id: string) {
  return prisma.video.findUnique({
    where: { id },
    include: {
      author: true,
      variants: true,
    },
  });
}

export async function searchVideos(query: string) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  return prisma.video.findMany({
    where: {
      OR: [
        { title: { contains: normalizedQuery, mode: "insensitive" } },
        { description: { contains: normalizedQuery, mode: "insensitive" } },
      ],
    },
    include: {
      author: true,
      variants: true,
    },
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
  });
}
