-- CreateTable
CREATE TABLE "WhatsAppBusiness" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "businessName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "phoneNumberId" TEXT NOT NULL,
    "wabaId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "tokenExpiresAt" TIMESTAMP(3) NOT NULL,
    "verificationStatus" TEXT NOT NULL DEFAULT 'pending',
    "webhookSecret" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhatsAppBusiness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatsAppRule" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "triggerValue" TEXT,
    "response" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "whatsappBusinessId" UUID,

    CONSTRAINT "WhatsAppRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatsAppTemplate" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "components" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "whatsappBusinessId" UUID,

    CONSTRAINT "WhatsAppTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatsAppStat" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messagesSent" INTEGER NOT NULL DEFAULT 0,
    "messagesReceived" INTEGER NOT NULL DEFAULT 0,
    "automationTriggered" INTEGER NOT NULL DEFAULT 0,
    "activeUsers" INTEGER NOT NULL DEFAULT 0,
    "whatsappBusinessId" UUID NOT NULL,

    CONSTRAINT "WhatsAppStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WhatsAppBusiness_phoneNumberId_key" ON "WhatsAppBusiness"("phoneNumberId");

-- CreateIndex
CREATE INDEX "WhatsAppBusiness_userId_idx" ON "WhatsAppBusiness"("userId");

-- CreateIndex
CREATE INDEX "WhatsAppRule_userId_idx" ON "WhatsAppRule"("userId");

-- CreateIndex
CREATE INDEX "WhatsAppRule_whatsappBusinessId_idx" ON "WhatsAppRule"("whatsappBusinessId");

-- CreateIndex
CREATE INDEX "WhatsAppTemplate_userId_idx" ON "WhatsAppTemplate"("userId");

-- CreateIndex
CREATE INDEX "WhatsAppTemplate_whatsappBusinessId_idx" ON "WhatsAppTemplate"("whatsappBusinessId");

-- CreateIndex
CREATE INDEX "WhatsAppStat_whatsappBusinessId_idx" ON "WhatsAppStat"("whatsappBusinessId");

-- CreateIndex
CREATE INDEX "WhatsAppStat_date_idx" ON "WhatsAppStat"("date");

-- AddForeignKey
ALTER TABLE "WhatsAppBusiness" ADD CONSTRAINT "WhatsAppBusiness_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsAppRule" ADD CONSTRAINT "WhatsAppRule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsAppRule" ADD CONSTRAINT "WhatsAppRule_whatsappBusinessId_fkey" FOREIGN KEY ("whatsappBusinessId") REFERENCES "WhatsAppBusiness"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsAppTemplate" ADD CONSTRAINT "WhatsAppTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsAppTemplate" ADD CONSTRAINT "WhatsAppTemplate_whatsappBusinessId_fkey" FOREIGN KEY ("whatsappBusinessId") REFERENCES "WhatsAppBusiness"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsAppStat" ADD CONSTRAINT "WhatsAppStat_whatsappBusinessId_fkey" FOREIGN KEY ("whatsappBusinessId") REFERENCES "WhatsAppBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;
