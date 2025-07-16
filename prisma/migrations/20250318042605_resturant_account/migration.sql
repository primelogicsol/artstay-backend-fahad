/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "accountId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_accountId_key" ON "Restaurant"("accountId");

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
