-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_automationId_fkey";

-- DropForeignKey
ALTER TABLE "Dms" DROP CONSTRAINT "Dms_automationId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_automationId_fkey";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dms" ADD CONSTRAINT "Dms_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
