-- CreateTable
CREATE TABLE "TravelBooking" (
    "travelBookingId" TEXT NOT NULL,
    "startDate" TEXT NOT NULL DEFAULT 'none',
    "endDate" TEXT NOT NULL DEFAULT 'none',
    "numberOfPeople" INTEGER NOT NULL DEFAULT 1,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'new',
    "tourId" TEXT NOT NULL,
    "travelPlanerId" TEXT NOT NULL,
    "bookingDetailId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TravelBooking_pkey" PRIMARY KEY ("travelBookingId")
);

-- CreateIndex
CREATE INDEX "TravelBooking_tourId_idx" ON "TravelBooking"("tourId");

-- CreateIndex
CREATE INDEX "TravelBooking_travelPlanerId_idx" ON "TravelBooking"("travelPlanerId");

-- CreateIndex
CREATE INDEX "TravelBooking_startDate_idx" ON "TravelBooking"("startDate");

-- AddForeignKey
ALTER TABLE "TravelBooking" ADD CONSTRAINT "TravelBooking_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "TravelTour"("tourId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelBooking" ADD CONSTRAINT "TravelBooking_travelPlanerId_fkey" FOREIGN KEY ("travelPlanerId") REFERENCES "TravelPlaner"("travelPlanerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelBooking" ADD CONSTRAINT "TravelBooking_bookingDetailId_fkey" FOREIGN KEY ("bookingDetailId") REFERENCES "BookingDetail"("bookingDetailId") ON DELETE CASCADE ON UPDATE CASCADE;
