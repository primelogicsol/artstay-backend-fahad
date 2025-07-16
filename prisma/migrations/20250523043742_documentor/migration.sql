/*
  Warnings:

  - You are about to drop the column `bio` on the `CraftDocumentor` table. All the data in the column will be lost.
  - You are about to drop the column `documentationStyle` on the `CraftDocumentor` table. All the data in the column will be lost.
  - You are about to drop the column `equipment` on the `CraftDocumentor` table. All the data in the column will be lost.
  - You are about to drop the column `expertise` on the `CraftDocumentor` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `CraftDocumentor` table. All the data in the column will be lost.
  - You are about to drop the column `mediaTypes` on the `CraftDocumentor` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioLinks` on the `CraftDocumentor` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `CraftDocumentor` table. All the data in the column will be lost.
  - You are about to drop the column `yearsOfExperience` on the `CraftDocumentor` table. All the data in the column will be lost.
  - You are about to drop the `DocumentedCraft` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DocumentorType" AS ENUM ('PHOTOGRAPHY', 'VIDEOGRAPHY', 'DRONE', 'HYBRID');

-- DropForeignKey
ALTER TABLE "DocumentedCraft" DROP CONSTRAINT "DocumentedCraft_documentorId_fkey";

-- AlterTable
ALTER TABLE "CraftDocumentor" DROP COLUMN "bio",
DROP COLUMN "documentationStyle",
DROP COLUMN "equipment",
DROP COLUMN "expertise",
DROP COLUMN "location",
DROP COLUMN "mediaTypes",
DROP COLUMN "portfolioLinks",
DROP COLUMN "profileImage",
DROP COLUMN "yearsOfExperience",
ADD COLUMN     "address" TEXT NOT NULL DEFAULT 'none',
ADD COLUMN     "craftFocusAreas" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'none',
ADD COLUMN     "dp" TEXT NOT NULL DEFAULT 'none',
ADD COLUMN     "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "specialization" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "yearsExperience" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "DocumentedCraft";

-- CreateTable
CREATE TABLE "DocumentorPortfolio" (
    "portfolioId" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "videos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "droneShots" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "documentorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentorPortfolio_pkey" PRIMARY KEY ("portfolioId")
);

-- CreateTable
CREATE TABLE "DocumentorPackage" (
    "packageId" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'none',
    "description" TEXT NOT NULL DEFAULT 'none',
    "duration" INTEGER NOT NULL DEFAULT 1,
    "deliverables" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "price" INTEGER NOT NULL DEFAULT 0,
    "documentorId" TEXT NOT NULL,
    "packageType" "DocumentorType" NOT NULL DEFAULT 'PHOTOGRAPHY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentorPackage_pkey" PRIMARY KEY ("packageId")
);

-- CreateTable
CREATE TABLE "DocumentorBooking" (
    "bookingId" TEXT NOT NULL,
    "startDate" TEXT NOT NULL DEFAULT 'none',
    "endDate" TEXT NOT NULL DEFAULT 'none',
    "location" TEXT NOT NULL DEFAULT 'none',
    "specialRequests" TEXT NOT NULL DEFAULT 'none',
    "status" TEXT NOT NULL DEFAULT 'new',
    "totalAmount" INTEGER NOT NULL DEFAULT 0,
    "packageId" TEXT NOT NULL,
    "documentorId" TEXT NOT NULL,
    "bookingDetailId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentorBooking_pkey" PRIMARY KEY ("bookingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentorPortfolio_documentorId_key" ON "DocumentorPortfolio"("documentorId");

-- AddForeignKey
ALTER TABLE "DocumentorPortfolio" ADD CONSTRAINT "DocumentorPortfolio_documentorId_fkey" FOREIGN KEY ("documentorId") REFERENCES "CraftDocumentor"("documentorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentorPackage" ADD CONSTRAINT "DocumentorPackage_documentorId_fkey" FOREIGN KEY ("documentorId") REFERENCES "CraftDocumentor"("documentorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentorBooking" ADD CONSTRAINT "DocumentorBooking_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "DocumentorPackage"("packageId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentorBooking" ADD CONSTRAINT "DocumentorBooking_documentorId_fkey" FOREIGN KEY ("documentorId") REFERENCES "CraftDocumentor"("documentorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentorBooking" ADD CONSTRAINT "DocumentorBooking_bookingDetailId_fkey" FOREIGN KEY ("bookingDetailId") REFERENCES "BookingDetail"("bookingDetailId") ON DELETE CASCADE ON UPDATE CASCADE;
