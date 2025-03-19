/*
  Warnings:

  - A unique constraint covering the columns `[userId,name,accountId]` on the table `Integrations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "INTEGRATIONS" ADD VALUE 'FACEBOOK';
ALTER TYPE "INTEGRATIONS" ADD VALUE 'WHATSAPP';

-- DropIndex
DROP INDEX "Integrations_instagramId_key";

-- DropIndex
DROP INDEX "Integrations_token_key";

-- AlterTable
ALTER TABLE "Automation" ADD COLUMN     "platform" "INTEGRATIONS" NOT NULL DEFAULT 'INSTAGRAM';

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "facebookHandle" TEXT,
ADD COLUMN     "whatsappNumber" TEXT,
ALTER COLUMN "instagramHandle" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "platform" "INTEGRATIONS" NOT NULL DEFAULT 'INSTAGRAM';

-- AlterTable
ALTER TABLE "Dms" ADD COLUMN     "platform" "INTEGRATIONS" NOT NULL DEFAULT 'INSTAGRAM';

-- AlterTable
ALTER TABLE "Integrations" ADD COLUMN     "accountId" TEXT NOT NULL DEFAULT '123456',
ADD COLUMN     "pageAccessToken" TEXT,
ADD COLUMN     "pageId" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "Listener" ADD COLUMN     "platform" "INTEGRATIONS" NOT NULL DEFAULT 'INSTAGRAM';

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "platform" "INTEGRATIONS" NOT NULL DEFAULT 'INSTAGRAM';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "platform" "INTEGRATIONS" NOT NULL DEFAULT 'INSTAGRAM';

-- AlterTable
ALTER TABLE "ScheduledContent" ADD COLUMN     "facebookPostId" TEXT,
ADD COLUMN     "integrationId" UUID;

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "platform" "INTEGRATIONS" NOT NULL DEFAULT 'INSTAGRAM';

-- CreateIndex
CREATE UNIQUE INDEX "Integrations_userId_name_accountId_key" ON "Integrations"("userId", "name", "accountId");

-- AddForeignKey
ALTER TABLE "ScheduledContent" ADD CONSTRAINT "ScheduledContent_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "Integrations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
