-- CreateEnum
CREATE TYPE "InfluencerStatus" AS ENUM ('DISCOVERED', 'CONTACTED', 'NEGOTIATING', 'CONTRACTED', 'ACTIVE', 'INACTIVE', 'BLACKLISTED');

-- CreateEnum
CREATE TYPE "InfluencerSource" AS ENUM ('INSTAGRAM_API', 'THIRD_PARTY', 'WEB_SCRAPING', 'AI_DISCOVERY', 'PORTAL_SIGNUP', 'MANUAL_IMPORT');

-- CreateEnum
CREATE TYPE "MyCampaignStatus" AS ENUM ('DRAFT', 'PLANNED', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Influencer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "profilePicture" TEXT,
    "followers" INTEGER NOT NULL DEFAULT 0,
    "following" INTEGER NOT NULL DEFAULT 0,
    "postsCount" INTEGER NOT NULL DEFAULT 0,
    "engagementRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "averageLikes" INTEGER NOT NULL DEFAULT 0,
    "averageComments" INTEGER NOT NULL DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "niche" TEXT,
    "email" TEXT,
    "website" TEXT,
    "contactInfo" JSONB,
    "notes" TEXT,
    "tags" TEXT[],
    "brandFit" INTEGER,
    "audienceMatch" INTEGER,
    "estimatedCost" DOUBLE PRECISION,
    "status" "InfluencerStatus" NOT NULL DEFAULT 'DISCOVERED',
    "source" "InfluencerSource" NOT NULL DEFAULT 'INSTAGRAM_API',
    "sourceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "aiDiscoveryScore" DOUBLE PRECISION,
    "aiDiscoveryData" JSONB,
    "portalSignup" BOOLEAN NOT NULL DEFAULT false,
    "audienceDemographics" JSONB,
    "authenticity" INTEGER,
    "growthRate" DOUBLE PRECISION,

    CONSTRAINT "Influencer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfluencerMetric" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "influencerId" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "followers" INTEGER NOT NULL,
    "engagementRate" DOUBLE PRECISION NOT NULL,
    "averageLikes" INTEGER,
    "averageComments" INTEGER,
    "reachEstimate" INTEGER,
    "impressionsEstimate" INTEGER,
    "metricSource" TEXT NOT NULL,

    CONSTRAINT "InfluencerMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "budget" DOUBLE PRECISION,
    "status" "CampaignStatus" NOT NULL DEFAULT 'DRAFT',
    "goals" JSONB,
    "brief" TEXT,
    "guidelines" TEXT,
    "hashtags" TEXT[],
    "mentions" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignInfluencer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "campaignId" UUID NOT NULL,
    "influencerId" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'invited',
    "rate" DOUBLE PRECISION,
    "deliverables" JSONB,
    "contentUrls" TEXT[],
    "notes" TEXT,
    "performance" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignInfluencer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignAnalytics" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "campaignId" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reach" INTEGER,
    "impressions" INTEGER,
    "engagement" INTEGER,
    "clicks" INTEGER,
    "conversions" INTEGER,
    "roi" DOUBLE PRECISION,
    "costPerEngagement" DOUBLE PRECISION,
    "costPerClick" DOUBLE PRECISION,
    "costPerConversion" DOUBLE PRECISION,
    "metrics" JSONB,

    CONSTRAINT "CampaignAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfluencerList" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "InfluencerList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfluencerImport" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fileName" TEXT NOT NULL,
    "recordCount" INTEGER NOT NULL,
    "successCount" INTEGER NOT NULL,
    "errorCount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "importType" TEXT NOT NULL,
    "errors" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "InfluencerImport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalSettings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "portalUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "portalAccess" TEXT NOT NULL DEFAULT 'public',
    "title" TEXT NOT NULL DEFAULT 'Join Our Influencer Network',
    "description" TEXT,
    "logo" TEXT,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "accentColor" TEXT,
    "textColor" TEXT,
    "customCss" TEXT,
    "customHeader" TEXT,
    "customFooter" TEXT,
    "notificationEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "PortalSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalFormField" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "options" JSONB,
    "order" INTEGER NOT NULL,
    "portalId" UUID NOT NULL,

    CONSTRAINT "PortalFormField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalVerificationSettings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "emailVerification" BOOLEAN NOT NULL DEFAULT true,
    "instagramAuth" BOOLEAN NOT NULL DEFAULT true,
    "manualReview" BOOLEAN NOT NULL DEFAULT true,
    "metricsVerification" BOOLEAN NOT NULL DEFAULT true,
    "minFollowers" INTEGER NOT NULL DEFAULT 1000,
    "minEngagementRate" DOUBLE PRECISION NOT NULL DEFAULT 2,
    "minAccountAge" INTEGER NOT NULL DEFAULT 3,
    "autoApprove" BOOLEAN NOT NULL DEFAULT true,
    "portalId" UUID NOT NULL,

    CONSTRAINT "PortalVerificationSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIDiscoverySettings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contentAnalysis" BOOLEAN NOT NULL DEFAULT true,
    "audienceOverlap" BOOLEAN NOT NULL DEFAULT true,
    "engagementPattern" BOOLEAN NOT NULL DEFAULT true,
    "brandAlignment" BOOLEAN NOT NULL DEFAULT true,
    "growthPrediction" BOOLEAN NOT NULL DEFAULT true,
    "fraudDetection" BOOLEAN NOT NULL DEFAULT true,
    "trainingFrequency" TEXT NOT NULL DEFAULT 'weekly',
    "lastTraining" TIMESTAMP(3),
    "minConfidenceScore" INTEGER NOT NULL DEFAULT 75,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIDiscoverySettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataSourceSettings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "instagramApiActive" BOOLEAN NOT NULL DEFAULT true,
    "thirdPartyActive" BOOLEAN NOT NULL DEFAULT true,
    "webScrapingActive" BOOLEAN NOT NULL DEFAULT true,
    "portalActive" BOOLEAN NOT NULL DEFAULT true,
    "aiDiscoveryActive" BOOLEAN NOT NULL DEFAULT true,
    "instagramRefreshRate" INTEGER NOT NULL DEFAULT 6,
    "thirdPartyRefreshRate" INTEGER NOT NULL DEFAULT 24,
    "webScrapingRateLimit" INTEGER NOT NULL DEFAULT 60,
    "webScrapingDailyQuota" INTEGER NOT NULL DEFAULT 1000,
    "rawDataRetention" INTEGER NOT NULL DEFAULT 30,
    "processedDataRetention" INTEGER NOT NULL DEFAULT 365,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataSourceSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InfluencerToList" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_InfluencerToList_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Influencer_username_key" ON "Influencer"("username");

-- CreateIndex
CREATE INDEX "Influencer_userId_idx" ON "Influencer"("userId");

-- CreateIndex
CREATE INDEX "Influencer_username_idx" ON "Influencer"("username");

-- CreateIndex
CREATE INDEX "Influencer_source_idx" ON "Influencer"("source");

-- CreateIndex
CREATE INDEX "Influencer_niche_idx" ON "Influencer"("niche");

-- CreateIndex
CREATE INDEX "InfluencerMetric_influencerId_idx" ON "InfluencerMetric"("influencerId");

-- CreateIndex
CREATE INDEX "InfluencerMetric_date_idx" ON "InfluencerMetric"("date");

-- CreateIndex
CREATE INDEX "Campaign_userId_idx" ON "Campaign"("userId");

-- CreateIndex
CREATE INDEX "Campaign_status_idx" ON "Campaign"("status");

-- CreateIndex
CREATE INDEX "CampaignInfluencer_campaignId_idx" ON "CampaignInfluencer"("campaignId");

-- CreateIndex
CREATE INDEX "CampaignInfluencer_influencerId_idx" ON "CampaignInfluencer"("influencerId");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignInfluencer_campaignId_influencerId_key" ON "CampaignInfluencer"("campaignId", "influencerId");

-- CreateIndex
CREATE INDEX "CampaignAnalytics_campaignId_idx" ON "CampaignAnalytics"("campaignId");

-- CreateIndex
CREATE INDEX "CampaignAnalytics_date_idx" ON "CampaignAnalytics"("date");

-- CreateIndex
CREATE INDEX "InfluencerList_userId_idx" ON "InfluencerList"("userId");

-- CreateIndex
CREATE INDEX "InfluencerImport_userId_idx" ON "InfluencerImport"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PortalSettings_portalUrl_key" ON "PortalSettings"("portalUrl");

-- CreateIndex
CREATE INDEX "PortalSettings_userId_idx" ON "PortalSettings"("userId");

-- CreateIndex
CREATE INDEX "PortalFormField_portalId_idx" ON "PortalFormField"("portalId");

-- CreateIndex
CREATE UNIQUE INDEX "PortalVerificationSettings_portalId_key" ON "PortalVerificationSettings"("portalId");

-- CreateIndex
CREATE UNIQUE INDEX "AIDiscoverySettings_userId_key" ON "AIDiscoverySettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DataSourceSettings_userId_key" ON "DataSourceSettings"("userId");

-- CreateIndex
CREATE INDEX "_InfluencerToList_B_index" ON "_InfluencerToList"("B");

-- AddForeignKey
ALTER TABLE "Influencer" ADD CONSTRAINT "Influencer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerMetric" ADD CONSTRAINT "InfluencerMetric_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignInfluencer" ADD CONSTRAINT "CampaignInfluencer_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignInfluencer" ADD CONSTRAINT "CampaignInfluencer_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignAnalytics" ADD CONSTRAINT "CampaignAnalytics_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerList" ADD CONSTRAINT "InfluencerList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerImport" ADD CONSTRAINT "InfluencerImport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalSettings" ADD CONSTRAINT "PortalSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalFormField" ADD CONSTRAINT "PortalFormField_portalId_fkey" FOREIGN KEY ("portalId") REFERENCES "PortalSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalVerificationSettings" ADD CONSTRAINT "PortalVerificationSettings_portalId_fkey" FOREIGN KEY ("portalId") REFERENCES "PortalSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIDiscoverySettings" ADD CONSTRAINT "AIDiscoverySettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataSourceSettings" ADD CONSTRAINT "DataSourceSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InfluencerToList" ADD CONSTRAINT "_InfluencerToList_A_fkey" FOREIGN KEY ("A") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InfluencerToList" ADD CONSTRAINT "_InfluencerToList_B_fkey" FOREIGN KEY ("B") REFERENCES "InfluencerList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
