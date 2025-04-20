-- AlterTable
ALTER TABLE "AffiliateUser" ADD COLUMN     "parentAffiliateId" UUID,
ADD COLUMN     "secondTierRate" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "AffiliateCoupon" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discountPercent" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "usageLimit" INTEGER,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "affiliateId" UUID NOT NULL,

    CONSTRAINT "AffiliateCoupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AffiliateNotification" (
    "id" TEXT NOT NULL,
    "affiliateId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AffiliateNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateCoupon_code_key" ON "AffiliateCoupon"("code");

-- AddForeignKey
ALTER TABLE "AffiliateUser" ADD CONSTRAINT "AffiliateUser_parentAffiliateId_fkey" FOREIGN KEY ("parentAffiliateId") REFERENCES "AffiliateUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliateCoupon" ADD CONSTRAINT "AffiliateCoupon_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "AffiliateUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliateNotification" ADD CONSTRAINT "AffiliateNotification_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "AffiliateUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
