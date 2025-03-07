-- AlterTable
ALTER TABLE "Automation" ALTER COLUMN "name" SET DEFAULT 'New Automation';

-- AlterTable
ALTER TABLE "ScheduledContent" ADD COLUMN     "automationId" UUID;

-- AddForeignKey
ALTER TABLE "ScheduledContent" ADD CONSTRAINT "ScheduledContent_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
