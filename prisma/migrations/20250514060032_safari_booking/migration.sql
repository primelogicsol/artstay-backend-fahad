-- CreateTable
CREATE TABLE "SafariBooking" (
    "safariBookingId" TEXT NOT NULL,
    "tourDate" TEXT NOT NULL DEFAULT 'none',
    "numberOfGuests" INTEGER NOT NULL DEFAULT 1,
    "totalAmount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'new',
    "tourId" TEXT NOT NULL,
    "safariId" TEXT NOT NULL,
    "bookingDetailId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SafariBooking_pkey" PRIMARY KEY ("safariBookingId")
);

-- CreateIndex
CREATE INDEX "SafariBooking_tourId_idx" ON "SafariBooking"("tourId");

-- CreateIndex
CREATE INDEX "SafariBooking_safariId_idx" ON "SafariBooking"("safariId");

-- CreateIndex
CREATE INDEX "SafariBooking_tourDate_idx" ON "SafariBooking"("tourDate");

-- AddForeignKey
ALTER TABLE "SafariBooking" ADD CONSTRAINT "SafariBooking_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "SafariTour"("tourId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SafariBooking" ADD CONSTRAINT "SafariBooking_safariId_fkey" FOREIGN KEY ("safariId") REFERENCES "Safari"("safariId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SafariBooking" ADD CONSTRAINT "SafariBooking_bookingDetailId_fkey" FOREIGN KEY ("bookingDetailId") REFERENCES "BookingDetail"("bookingDetailId") ON DELETE CASCADE ON UPDATE CASCADE;
