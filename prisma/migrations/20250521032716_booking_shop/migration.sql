/*
  Warnings:

  - You are about to drop the column `bookingDetailBookingDetailId` on the `ShopOrder` table. All the data in the column will be lost.
  - You are about to drop the column `orderDetailId` on the `ShopOrder` table. All the data in the column will be lost.
  - Added the required column `bookinDetailId` to the `ShopOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ShopOrder" DROP CONSTRAINT "ShopOrder_bookingDetailBookingDetailId_fkey";

-- AlterTable
ALTER TABLE "ShopOrder" DROP COLUMN "bookingDetailBookingDetailId",
DROP COLUMN "orderDetailId",
ADD COLUMN     "bookinDetailId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ShopOrder" ADD CONSTRAINT "ShopOrder_bookinDetailId_fkey" FOREIGN KEY ("bookinDetailId") REFERENCES "BookingDetail"("bookingDetailId") ON DELETE RESTRICT ON UPDATE CASCADE;
