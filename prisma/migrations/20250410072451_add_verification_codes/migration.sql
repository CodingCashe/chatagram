-- AlterTable
ALTER TABLE "InfluencerRates" ALTER COLUMN "contentType" DROP NOT NULL,
ALTER COLUMN "platform" DROP NOT NULL,
ALTER COLUMN "rate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SocialAccount" ALTER COLUMN "handle" DROP NOT NULL;

-- CreateTable
CREATE TABLE "VerificationCode" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "phoneNumber" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'SMS',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VerificationCode_phoneNumber_idx" ON "VerificationCode"("phoneNumber");

-- CreateIndex
CREATE INDEX "VerificationCode_code_idx" ON "VerificationCode"("code");

-- CreateIndex
CREATE INDEX "VerificationCode_expiresAt_idx" ON "VerificationCode"("expiresAt");
