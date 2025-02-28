/*
  Warnings:

  - Made the column `targetAudience` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Made the column `website` on table `Business` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "targetAudience" SET NOT NULL,
ALTER COLUMN "website" SET NOT NULL;
