/*
  Warnings:

  - You are about to drop the column `bookinDetailId` on the `ShopOrder` table. All the data in the column will be lost.
  - Added the required column `bookingDetailId` to the `ShopOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ShopOrder" DROP CONSTRAINT "ShopOrder_bookinDetailId_fkey";

-- AlterTable
ALTER TABLE "ShopOrder" DROP COLUMN "bookinDetailId",
ADD COLUMN     "bookingDetailId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ShopOrder" ADD CONSTRAINT "ShopOrder_bookingDetailId_fkey" FOREIGN KEY ("bookingDetailId") REFERENCES "BookingDetail"("bookingDetailId") ON DELETE RESTRICT ON UPDATE CASCADE;
