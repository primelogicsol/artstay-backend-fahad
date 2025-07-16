/*
  Warnings:

  - You are about to drop the column `firstName` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "name",
ADD COLUMN     "shopName" TEXT NOT NULL DEFAULT 'none',
ADD COLUMN     "shopTiming" TEXT NOT NULL DEFAULT 'none-none',
ADD COLUMN     "workingDays" TEXT[] DEFAULT ARRAY[]::TEXT[];
