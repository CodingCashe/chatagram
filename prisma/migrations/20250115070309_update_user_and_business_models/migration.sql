-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    "businessDescription" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "instagramHandle" TEXT NOT NULL,
    "welcomeMessage" TEXT NOT NULL,
    "responseLanguage" TEXT NOT NULL,
    "businessHours" TEXT NOT NULL,
    "autoReplyEnabled" BOOLEAN NOT NULL,
    "promotionMessage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
