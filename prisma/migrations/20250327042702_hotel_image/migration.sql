/*
  Warnings:

  - You are about to drop the column `pictures` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "pictures",
ADD COLUMN     "images" TEXT[];
