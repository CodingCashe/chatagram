-- CreateTable
CREATE TABLE "ScheduledContent" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "instagramPostId" TEXT,
    "caption" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "permalink" TEXT,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "publishedDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "userId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScheduledContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduledContent_instagramPostId_key" ON "ScheduledContent"("instagramPostId");

-- AddForeignKey
ALTER TABLE "ScheduledContent" ADD CONSTRAINT "ScheduledContent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
