CREATE TABLE "VideoVariant" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT,

    CONSTRAINT "VideoVariant_pkey" PRIMARY KEY ("id")
);

INSERT INTO "VideoVariant" ("id", "videoId", "height", "url")
SELECT gen_random_uuid()::text, "id", 720, "videoUrl"
FROM "Video";

INSERT INTO "VideoVariant" ("id", "videoId", "height", "url")
SELECT gen_random_uuid()::text, "id", 144, "previewVideoUrl"
FROM "Video"
WHERE "previewVideoUrl" IS NOT NULL;

CREATE UNIQUE INDEX "VideoVariant_videoId_height_key"
ON "VideoVariant"("videoId", "height");

ALTER TABLE "VideoVariant"
ADD CONSTRAINT "VideoVariant_videoId_fkey"
FOREIGN KEY ("videoId") REFERENCES "Video"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Video" DROP COLUMN "videoUrl";
ALTER TABLE "Video" DROP COLUMN "previewVideoUrl";
