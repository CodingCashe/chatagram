/*
  Warnings:

  - The `status` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `InfluencerMetric` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "InfluencerSource" ADD VALUE 'IMPORT';

-- AlterEnum
ALTER TYPE "InfluencerStatus" ADD VALUE 'IDENTIFIED';

-- DropForeignKey
ALTER TABLE "InfluencerMetric" DROP CONSTRAINT "InfluencerMetric_influencerId_fkey";

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "businessProfileId" UUID,
DROP COLUMN "status",
ADD COLUMN     "status" "MyCampaignStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "CampaignInfluencer" ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Influencer" ADD COLUMN     "currentMonthEarnings" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "isAvailableForHire" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "monthlyEarningsGrowth" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "pendingEarnings" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "platforms" TEXT[],
ADD COLUMN     "totalEarnings" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "InfluencerMetric";

-- CreateTable
CREATE TABLE "InfluencerMetrics" (
    "id" TEXT NOT NULL,
    "influencerId" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileViews" INTEGER NOT NULL DEFAULT 0,
    "profileViewsGrowth" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "profileViewsPercentile" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "searchAppearances" INTEGER NOT NULL DEFAULT 0,
    "searchAppearancesPercentile" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "campaignInvites" INTEGER NOT NULL DEFAULT 0,
    "campaignInvitesGrowth" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "brandContacts" INTEGER NOT NULL DEFAULT 0,
    "brandContactsPercentile" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "engagementRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "engagementGrowth" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "followers" INTEGER NOT NULL DEFAULT 0,
    "followersGrowth" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "averageLikes" INTEGER,
    "averageComments" INTEGER,
    "reachEstimate" INTEGER,
    "acceptanceRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "acceptanceRateChange" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "completionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "completionRateChange" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "clientSatisfaction" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "impressionsEstimate" INTEGER,
    "metricSource" TEXT,

    CONSTRAINT "InfluencerMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportHistory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "fileName" TEXT NOT NULL,
    "recordsTotal" INTEGER NOT NULL,
    "recordsAdded" INTEGER NOT NULL,
    "recordsUpdated" INTEGER NOT NULL,
    "recordsFailed" INTEGER NOT NULL,
    "errors" TEXT[],
    "importOption" TEXT NOT NULL,
    "enrichData" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImportHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstagramCredentials" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "appId" TEXT NOT NULL,
    "appSecret" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "tokenExpiry" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstagramCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfluencerListInfluencer" (
    "listId" UUID NOT NULL,
    "influencerId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InfluencerListInfluencer_pkey" PRIMARY KEY ("listId","influencerId")
);

-- CreateTable
CREATE TABLE "BusinessProfile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "companyName" TEXT NOT NULL,
    "industry" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "description" TEXT,
    "location" TEXT,
    "size" TEXT,
    "foundedYear" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialAccount" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "influencerId" UUID NOT NULL,
    "platform" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "url" TEXT,
    "followers" INTEGER,
    "engagement" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentType" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "influencerId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentSample" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "profileId" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentSample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfluencerRates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "influencerId" UUID NOT NULL,
    "postRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "videoRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "storyRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InfluencerRates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfluencerEarnings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "influencerId" UUID NOT NULL,
    "campaignId" UUID,
    "campaignName" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InfluencerEarnings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedSearch" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "businessId" UUID,
    "name" TEXT NOT NULL,
    "filters" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedSearch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opportunity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "businessId" UUID NOT NULL,
    "brandName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT,
    "platforms" TEXT[],
    "contentType" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "deadline" TIMESTAMP(3),
    "deliveryDate" TIMESTAMP(3),
    "tags" TEXT[],
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpportunityApplication" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "opportunityId" UUID NOT NULL,
    "influencerId" UUID NOT NULL,
    "message" TEXT,
    "proposedRate" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OpportunityApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollabChat" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollabChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollabChatParticipant" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "chatId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "influencerId" UUID,
    "businessId" UUID,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollabChatParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollabMessage" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "chatId" UUID NOT NULL,
    "senderId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "contentType" TEXT NOT NULL DEFAULT 'text',
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollabMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InfluencerMetrics_influencerId_idx" ON "InfluencerMetrics"("influencerId");

-- CreateIndex
CREATE INDEX "InfluencerMetrics_date_idx" ON "InfluencerMetrics"("date");

-- CreateIndex
CREATE UNIQUE INDEX "ImportHistory_userId_key" ON "ImportHistory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "InstagramCredentials_userId_key" ON "InstagramCredentials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerListInfluencer_listId_key" ON "InfluencerListInfluencer"("listId");

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerListInfluencer_influencerId_key" ON "InfluencerListInfluencer"("influencerId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessProfile_userId_key" ON "BusinessProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SocialAccount_influencerId_platform_key" ON "SocialAccount"("influencerId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "ContentType_influencerId_type_key" ON "ContentType"("influencerId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "ContentSample_profileId_key" ON "ContentSample"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerRates_influencerId_key" ON "InfluencerRates"("influencerId");

-- CreateIndex
CREATE INDEX "InfluencerEarnings_influencerId_idx" ON "InfluencerEarnings"("influencerId");

-- CreateIndex
CREATE INDEX "InfluencerEarnings_campaignId_idx" ON "InfluencerEarnings"("campaignId");

-- CreateIndex
CREATE INDEX "SavedSearch_userId_idx" ON "SavedSearch"("userId");

-- CreateIndex
CREATE INDEX "SavedSearch_businessId_idx" ON "SavedSearch"("businessId");

-- CreateIndex
CREATE INDEX "Opportunity_businessId_idx" ON "Opportunity"("businessId");

-- CreateIndex
CREATE INDEX "Opportunity_status_idx" ON "Opportunity"("status");

-- CreateIndex
CREATE INDEX "OpportunityApplication_opportunityId_idx" ON "OpportunityApplication"("opportunityId");

-- CreateIndex
CREATE INDEX "OpportunityApplication_influencerId_idx" ON "OpportunityApplication"("influencerId");

-- CreateIndex
CREATE UNIQUE INDEX "OpportunityApplication_opportunityId_influencerId_key" ON "OpportunityApplication"("opportunityId", "influencerId");

-- CreateIndex
CREATE INDEX "CollabChatParticipant_chatId_idx" ON "CollabChatParticipant"("chatId");

-- CreateIndex
CREATE INDEX "CollabChatParticipant_userId_idx" ON "CollabChatParticipant"("userId");

-- CreateIndex
CREATE INDEX "CollabChatParticipant_influencerId_idx" ON "CollabChatParticipant"("influencerId");

-- CreateIndex
CREATE INDEX "CollabChatParticipant_businessId_idx" ON "CollabChatParticipant"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "CollabChatParticipant_chatId_userId_key" ON "CollabChatParticipant"("chatId", "userId");

-- CreateIndex
CREATE INDEX "CollabMessage_chatId_idx" ON "CollabMessage"("chatId");

-- CreateIndex
CREATE INDEX "CollabMessage_senderId_idx" ON "CollabMessage"("senderId");

-- CreateIndex
CREATE INDEX "Campaign_status_idx" ON "Campaign"("status");

-- CreateIndex
CREATE INDEX "Campaign_businessProfileId_idx" ON "Campaign"("businessProfileId");

-- AddForeignKey
ALTER TABLE "InfluencerMetrics" ADD CONSTRAINT "InfluencerMetrics_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_businessProfileId_fkey" FOREIGN KEY ("businessProfileId") REFERENCES "BusinessProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportHistory" ADD CONSTRAINT "ImportHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramCredentials" ADD CONSTRAINT "InstagramCredentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerListInfluencer" ADD CONSTRAINT "InfluencerListInfluencer_listId_fkey" FOREIGN KEY ("listId") REFERENCES "InfluencerList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerListInfluencer" ADD CONSTRAINT "InfluencerListInfluencer_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProfile" ADD CONSTRAINT "BusinessProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialAccount" ADD CONSTRAINT "SocialAccount_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentType" ADD CONSTRAINT "ContentType_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentSample" ADD CONSTRAINT "ContentSample_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerRates" ADD CONSTRAINT "InfluencerRates_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerEarnings" ADD CONSTRAINT "InfluencerEarnings_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedSearch" ADD CONSTRAINT "SavedSearch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedSearch" ADD CONSTRAINT "SavedSearch_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "BusinessProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "BusinessProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityApplication" ADD CONSTRAINT "OpportunityApplication_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityApplication" ADD CONSTRAINT "OpportunityApplication_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollabChatParticipant" ADD CONSTRAINT "CollabChatParticipant_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "CollabChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollabChatParticipant" ADD CONSTRAINT "CollabChatParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollabChatParticipant" ADD CONSTRAINT "CollabChatParticipant_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollabChatParticipant" ADD CONSTRAINT "CollabChatParticipant_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "BusinessProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollabMessage" ADD CONSTRAINT "CollabMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "CollabChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollabMessage" ADD CONSTRAINT "CollabMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "CollabChatParticipant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
