/*
  Warnings:

  - You are about to drop the column `portfolioId` on the `Artisan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[artisanId]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `artisanId` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Artisan" DROP CONSTRAINT "Artisan_portfolioId_fkey";

-- AlterTable
ALTER TABLE "Artisan" DROP COLUMN "portfolioId";

-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "artisanId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_artisanId_key" ON "Portfolio"("artisanId");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_artisanId_fkey" FOREIGN KEY ("artisanId") REFERENCES "Artisan"("artisanId") ON DELETE CASCADE ON UPDATE CASCADE;
