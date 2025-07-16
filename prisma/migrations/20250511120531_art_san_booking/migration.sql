/*
  Warnings:

  - You are about to drop the column `additionalInfo` on the `BookingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `BookingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `arrivalTime` on the `BookingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `bookingReservationId` on the `BookingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `BookingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `BookingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `BookingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `BookingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `BookingDetail` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoomBooking" DROP CONSTRAINT "RoomBooking_bookingDetailId_fkey";

-- DropIndex
DROP INDEX "BookingDetail_bookingReservationId_idx";

-- DropIndex
DROP INDEX "BookingDetail_bookingReservationId_key";

-- AlterTable
ALTER TABLE "BookingDetail" DROP COLUMN "additionalInfo",
DROP COLUMN "address",
DROP COLUMN "arrivalTime",
DROP COLUMN "bookingReservationId",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "dob",
DROP COLUMN "status",
DROP COLUMN "zip",
ADD COLUMN     "additionalNote" TEXT NOT NULL DEFAULT 'none';

-- CreateTable
CREATE TABLE "ArtisanBooking" (
    "artisanBookingId" TEXT NOT NULL,
    "startDate" TEXT NOT NULL DEFAULT 'none',
    "endDate" TEXT NOT NULL DEFAULT 'none',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "packageId" TEXT NOT NULL,
    "artisanId" TEXT NOT NULL,
    "bookingDetailId" TEXT NOT NULL,

    CONSTRAINT "ArtisanBooking_pkey" PRIMARY KEY ("artisanBookingId")
);

-- CreateTable
CREATE TABLE "RoomBookingDetail" (
    "bookingDetailId" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'none',
    "country" TEXT NOT NULL DEFAULT 'none',
    "dob" TEXT NOT NULL DEFAULT 'none',
    "phone" TEXT NOT NULL DEFAULT 'none',
    "zip" TEXT NOT NULL DEFAULT 'none',
    "address" TEXT NOT NULL DEFAULT 'none',
    "firstName" TEXT NOT NULL DEFAULT 'none',
    "lastName" TEXT NOT NULL DEFAULT 'none',
    "email" TEXT NOT NULL DEFAULT 'none',
    "arrivalTime" TEXT NOT NULL DEFAULT 'none',
    "additionalInfo" TEXT NOT NULL DEFAULT 'none',
    "status" TEXT NOT NULL DEFAULT 'new',
    "bookingReservationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomBookingDetail_pkey" PRIMARY KEY ("bookingDetailId")
);

-- CreateIndex
CREATE INDEX "RoomBookingDetail_bookingReservationId_idx" ON "RoomBookingDetail"("bookingReservationId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomBookingDetail_bookingReservationId_key" ON "RoomBookingDetail"("bookingReservationId");

-- AddForeignKey
ALTER TABLE "ArtisanBooking" ADD CONSTRAINT "ArtisanBooking_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "ArtisanPackage"("packageId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtisanBooking" ADD CONSTRAINT "ArtisanBooking_artisanId_fkey" FOREIGN KEY ("artisanId") REFERENCES "Artisan"("artisanId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtisanBooking" ADD CONSTRAINT "ArtisanBooking_bookingDetailId_fkey" FOREIGN KEY ("bookingDetailId") REFERENCES "BookingDetail"("bookingDetailId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomBooking" ADD CONSTRAINT "RoomBooking_bookingDetailId_fkey" FOREIGN KEY ("bookingDetailId") REFERENCES "RoomBookingDetail"("bookingDetailId") ON DELETE CASCADE ON UPDATE CASCADE;
