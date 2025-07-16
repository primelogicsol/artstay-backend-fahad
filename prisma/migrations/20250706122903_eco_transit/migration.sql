/*
  Warnings:

  - You are about to drop the column `hotelId` on the `RoomRatePlan` table. All the data in the column will be lost.
  - You are about to drop the column `hotelName` on the `RoomRatePlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RoomRatePlan" DROP COLUMN "hotelId",
DROP COLUMN "hotelName";

-- CreateTable
CREATE TABLE "EcoTransit" (
    "transitId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'none',
    "dp" TEXT NOT NULL DEFAULT 'none',
    "address" TEXT NOT NULL DEFAULT 'none',
    "description" TEXT NOT NULL DEFAULT 'none',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EcoTransit_pkey" PRIMARY KEY ("transitId")
);

-- CreateTable
CREATE TABLE "EcoTransitOption" (
    "optionId" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'none',
    "operator" TEXT NOT NULL DEFAULT 'none',
    "description" TEXT NOT NULL DEFAULT 'none',
    "duration" TEXT NOT NULL DEFAULT 'none',
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "baseFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "transitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EcoTransitOption_pkey" PRIMARY KEY ("optionId")
);

-- CreateTable
CREATE TABLE "EcoTransitBooking" (
    "transitBookingId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "transitId" TEXT NOT NULL,
    "bookingDetailId" TEXT NOT NULL,
    "travelDate" TEXT NOT NULL DEFAULT 'none',
    "numberOfPassengers" INTEGER NOT NULL DEFAULT 1,
    "distance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EcoTransitBooking_pkey" PRIMARY KEY ("transitBookingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "EcoTransit_accountId_key" ON "EcoTransit"("accountId");

-- CreateIndex
CREATE INDEX "EcoTransitBooking_optionId_idx" ON "EcoTransitBooking"("optionId");

-- CreateIndex
CREATE INDEX "EcoTransitBooking_transitId_idx" ON "EcoTransitBooking"("transitId");

-- CreateIndex
CREATE INDEX "EcoTransitBooking_travelDate_idx" ON "EcoTransitBooking"("travelDate");

-- AddForeignKey
ALTER TABLE "EcoTransit" ADD CONSTRAINT "EcoTransit_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EcoTransitOption" ADD CONSTRAINT "EcoTransitOption_transitId_fkey" FOREIGN KEY ("transitId") REFERENCES "EcoTransit"("transitId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EcoTransitBooking" ADD CONSTRAINT "EcoTransitBooking_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "EcoTransitOption"("optionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EcoTransitBooking" ADD CONSTRAINT "EcoTransitBooking_transitId_fkey" FOREIGN KEY ("transitId") REFERENCES "EcoTransit"("transitId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EcoTransitBooking" ADD CONSTRAINT "EcoTransitBooking_bookingDetailId_fkey" FOREIGN KEY ("bookingDetailId") REFERENCES "BookingDetail"("bookingDetailId") ON DELETE CASCADE ON UPDATE CASCADE;
