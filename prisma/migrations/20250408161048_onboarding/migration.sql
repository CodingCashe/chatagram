/*
  Warnings:

  - The `contentType` column on the `Opportunity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `impressions` to the `InfluencerMetrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `impressionsGrowth` to the `InfluencerMetrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentType` to the `InfluencerRates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform` to the `InfluencerRates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `InfluencerRates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budgetMax` to the `Opportunity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budgetMin` to the `Opportunity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Opportunity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handle` to the `SocialAccount` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OnboardingStepStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED');

-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_businessProfileId_fkey";

-- DropForeignKey
ALTER TABLE "CollabChatParticipant" DROP CONSTRAINT "CollabChatParticipant_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Opportunity" DROP CONSTRAINT "Opportunity_businessId_fkey";

-- DropForeignKey
ALTER TABLE "SavedSearch" DROP CONSTRAINT "SavedSearch_businessId_fkey";

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "goalStatement" TEXT,
ADD COLUMN     "growthChallenges" TEXT[],
ADD COLUMN     "learningTopics" TEXT[],
ADD COLUMN     "location" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "size" TEXT;

-- AlterTable
ALTER TABLE "Influencer" ADD COLUMN     "brandCollabTypes" TEXT[],
ADD COLUMN     "completedCampaigns" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "contentFrequency" TEXT,
ADD COLUMN     "contentStyle" TEXT,
ADD COLUMN     "goalStatement" TEXT,
ADD COLUMN     "incomeGoal" DOUBLE PRECISION,
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "personalityType" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "selectedContentDays" INTEGER[],
ADD COLUMN     "statuss" TEXT NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "InfluencerMetrics" ADD COLUMN     "impressions" INTEGER NOT NULL,
ADD COLUMN     "impressionsGrowth" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "InfluencerRates" ADD COLUMN     "contentType" TEXT NOT NULL,
ADD COLUMN     "platform" TEXT NOT NULL,
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Opportunity" ADD COLUMN     "budgetMax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "budgetMin" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "maxFollowers" INTEGER,
ADD COLUMN     "minEngagementRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "minFollowers" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "contentType",
ADD COLUMN     "contentType" TEXT[];

-- AlterTable
ALTER TABLE "SocialAccount" ADD COLUMN     "handle" TEXT NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "OnboardingProgress" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "userType" TEXT NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "totalSteps" INTEGER NOT NULL DEFAULT 8,
    "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "abandonedAt" TIMESTAMP(3),
    "remindersSent" INTEGER NOT NULL DEFAULT 0,
    "lastReminderAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnboardingProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnboardingStep" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "progressId" UUID NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "stepName" TEXT NOT NULL,
    "status" "OnboardingStepStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "data" JSONB,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnboardingStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Application" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "opportunityId" UUID NOT NULL,
    "influencerId" UUID NOT NULL,
    "message" TEXT,
    "proposal" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfluencerRating" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "businessId" UUID NOT NULL,
    "influencerId" UUID NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InfluencerRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingProgress_userId_key" ON "OnboardingProgress"("userId");

-- CreateIndex
CREATE INDEX "OnboardingProgress_userType_idx" ON "OnboardingProgress"("userType");

-- CreateIndex
CREATE INDEX "OnboardingProgress_completedAt_idx" ON "OnboardingProgress"("completedAt");

-- CreateIndex
CREATE INDEX "OnboardingProgress_abandonedAt_idx" ON "OnboardingProgress"("abandonedAt");

-- CreateIndex
CREATE INDEX "OnboardingStep_progressId_idx" ON "OnboardingStep"("progressId");

-- CreateIndex
CREATE INDEX "OnboardingStep_status_idx" ON "OnboardingStep"("status");

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingStep_progressId_stepNumber_key" ON "OnboardingStep"("progressId", "stepNumber");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerRating_businessId_influencerId_key" ON "InfluencerRating"("businessId", "influencerId");

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_businessProfileId_fkey" FOREIGN KEY ("businessProfileId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedSearch" ADD CONSTRAINT "SavedSearch_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollabChatParticipant" ADD CONSTRAINT "CollabChatParticipant_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnboardingProgress" ADD CONSTRAINT "OnboardingProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnboardingStep" ADD CONSTRAINT "OnboardingStep_progressId_fkey" FOREIGN KEY ("progressId") REFERENCES "OnboardingProgress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerRating" ADD CONSTRAINT "InfluencerRating_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerRating" ADD CONSTRAINT "InfluencerRating_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
