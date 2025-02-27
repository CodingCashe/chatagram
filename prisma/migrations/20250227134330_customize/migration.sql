-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "automationAdditionalNotes" TEXT,
ADD COLUMN     "automationGoals" JSONB,
ADD COLUMN     "automationSetupComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "automationSetupDate" TIMESTAMP(3),
ADD COLUMN     "businessTypeData" JSONB,
ADD COLUMN     "customerJourney" JSONB,
ADD COLUMN     "features" JSONB,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "targetAudience" TEXT,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "websiteAnalysis" JSONB;
