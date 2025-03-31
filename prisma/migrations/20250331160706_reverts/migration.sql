/*
  Warnings:

  - You are about to drop the column `parentAffiliateId` on the `AffiliateUser` table. All the data in the column will be lost.
  - You are about to drop the column `secondTierRate` on the `AffiliateUser` table. All the data in the column will be lost.
  - You are about to drop the `AffiliateCoupon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AffiliateNotification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AffiliateCoupon" DROP CONSTRAINT "AffiliateCoupon_affiliateId_fkey";

-- DropForeignKey
ALTER TABLE "AffiliateNotification" DROP CONSTRAINT "AffiliateNotification_affiliateId_fkey";

-- DropForeignKey
ALTER TABLE "AffiliateUser" DROP CONSTRAINT "AffiliateUser_parentAffiliateId_fkey";

-- AlterTable
ALTER TABLE "AffiliateUser" DROP COLUMN "parentAffiliateId",
DROP COLUMN "secondTierRate";

-- DropTable
DROP TABLE "AffiliateCoupon";

-- DropTable
DROP TABLE "AffiliateNotification";
