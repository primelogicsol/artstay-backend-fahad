/*
  Warnings:

  - You are about to drop the column `droneShots` on the `DocumentorPortfolio` table. All the data in the column will be lost.
  - You are about to drop the column `videos` on the `DocumentorPortfolio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DocumentorPortfolio" DROP COLUMN "droneShots",
DROP COLUMN "videos";

-- AlterTable
ALTER TABLE "Hotel" ALTER COLUMN "longitude" SET DEFAULT '',
ALTER COLUMN "longitude" SET DATA TYPE TEXT,
ALTER COLUMN "latitude" SET DEFAULT '',
ALTER COLUMN "latitude" SET DATA TYPE TEXT;
