/*
  Warnings:

  - Made the column `instagramHandle` on table `Business` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "instagramHandle" SET NOT NULL;
