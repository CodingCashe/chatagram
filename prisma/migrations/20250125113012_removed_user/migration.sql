/*
  Warnings:

  - You are about to drop the column `timestamp` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `ChatMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_automationId_fkey";

-- DropIndex
DROP INDEX "Message_userId_pageId_idx";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "timestamp",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "automationId" DROP NOT NULL;

-- DropTable
DROP TABLE "ChatMessage";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
