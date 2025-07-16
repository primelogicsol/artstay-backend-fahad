-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AccountType" ADD VALUE 'CRAFT_DOCUMENTOR';
ALTER TYPE "AccountType" ADD VALUE 'CRAFT_DOCUMENTOR_ADMIN';

-- CreateTable
CREATE TABLE "CraftDocumentor" (
    "documentorId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT 'none',
    "lastName" TEXT NOT NULL DEFAULT 'none',
    "profileImage" TEXT NOT NULL DEFAULT 'none',
    "bio" TEXT NOT NULL DEFAULT 'none',
    "expertise" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "location" TEXT NOT NULL DEFAULT 'none',
    "equipment" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "yearsOfExperience" INTEGER NOT NULL DEFAULT 0,
    "documentationStyle" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "mediaTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "portfolioLinks" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CraftDocumentor_pkey" PRIMARY KEY ("documentorId")
);

-- CreateTable
CREATE TABLE "DocumentedCraft" (
    "craftId" TEXT NOT NULL,
    "craftName" TEXT NOT NULL DEFAULT 'none',
    "region" TEXT NOT NULL DEFAULT 'none',
    "description" TEXT NOT NULL DEFAULT 'none',
    "mediaUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "documentorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentedCraft_pkey" PRIMARY KEY ("craftId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CraftDocumentor_accountId_key" ON "CraftDocumentor"("accountId");

-- AddForeignKey
ALTER TABLE "CraftDocumentor" ADD CONSTRAINT "CraftDocumentor_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentedCraft" ADD CONSTRAINT "DocumentedCraft_documentorId_fkey" FOREIGN KEY ("documentorId") REFERENCES "CraftDocumentor"("documentorId") ON DELETE CASCADE ON UPDATE CASCADE;
