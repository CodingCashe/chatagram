-- AlterTable
ALTER TABLE "Integrations" ADD COLUMN     "followersCount" INTEGER,
ADD COLUMN     "followingCount" INTEGER,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "postsCount" INTEGER,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "username" TEXT;
