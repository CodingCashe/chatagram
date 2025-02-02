-- CreateTable
CREATE TABLE "FollowerHistory" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "followerCount" INTEGER NOT NULL,
    "integrationId" TEXT NOT NULL,

    CONSTRAINT "FollowerHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FollowerHistory" ADD CONSTRAINT "FollowerHistory_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "Integrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
