/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumberId]` on the table `Integrations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pageId]` on the table `Integrations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pinterestId]` on the table `Integrations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[twitterId]` on the table `Integrations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[linkedinId]` on the table `Integrations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tiktokId]` on the table `Integrations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "INTEGRATIONS" ADD VALUE 'WHATSAPP';
ALTER TYPE "INTEGRATIONS" ADD VALUE 'FACEBOOK';
ALTER TYPE "INTEGRATIONS" ADD VALUE 'PINTEREST';
ALTER TYPE "INTEGRATIONS" ADD VALUE 'TWITTER';
ALTER TYPE "INTEGRATIONS" ADD VALUE 'LINKEDIN';
ALTER TYPE "INTEGRATIONS" ADD VALUE 'TIKTOK';

-- AlterTable
ALTER TABLE "Automation" ADD COLUMN     "platform" "INTEGRATIONS" NOT NULL DEFAULT 'INSTAGRAM';

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "facebookPageId" TEXT,
ADD COLUMN     "linkedinProfileId" TEXT,
ADD COLUMN     "pinterestHandle" TEXT,
ADD COLUMN     "tiktokHandle" TEXT,
ADD COLUMN     "twitterHandle" TEXT,
ADD COLUMN     "whatsappNumber" TEXT;

-- AlterTable
ALTER TABLE "Integrations" ADD COLUMN     "boardCount" INTEGER,
ADD COLUMN     "linkedinId" TEXT,
ADD COLUMN     "pageId" TEXT,
ADD COLUMN     "pageName" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "phoneNumberId" TEXT,
ADD COLUMN     "pinterestId" TEXT,
ADD COLUMN     "tiktokId" TEXT,
ADD COLUMN     "tweetCount" INTEGER,
ADD COLUMN     "twitterId" TEXT;

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT NOT NULL,
    "senderId" UUID NOT NULL,
    "receiverId" UUID,
    "isFromAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserNotification" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Integrations_phoneNumberId_key" ON "Integrations"("phoneNumberId");

-- CreateIndex
CREATE UNIQUE INDEX "Integrations_pageId_key" ON "Integrations"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "Integrations_pinterestId_key" ON "Integrations"("pinterestId");

-- CreateIndex
CREATE UNIQUE INDEX "Integrations_twitterId_key" ON "Integrations"("twitterId");

-- CreateIndex
CREATE UNIQUE INDEX "Integrations_linkedinId_key" ON "Integrations"("linkedinId");

-- CreateIndex
CREATE UNIQUE INDEX "Integrations_tiktokId_key" ON "Integrations"("tiktokId");

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
