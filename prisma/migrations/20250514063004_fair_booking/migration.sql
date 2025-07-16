-- CreateTable
CREATE TABLE "FairBooking" (
    "fairBookingId" TEXT NOT NULL,
    "eventDate" TEXT NOT NULL DEFAULT 'none',
    "numberOfTickets" INTEGER NOT NULL DEFAULT 1,
    "ticketType" TEXT NOT NULL DEFAULT 'general',
    "totalAmount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'new',
    "eventId" TEXT NOT NULL,
    "fairId" TEXT NOT NULL,
    "bookingDetailId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FairBooking_pkey" PRIMARY KEY ("fairBookingId")
);

-- CreateIndex
CREATE INDEX "FairBooking_eventId_idx" ON "FairBooking"("eventId");

-- CreateIndex
CREATE INDEX "FairBooking_fairId_idx" ON "FairBooking"("fairId");

-- CreateIndex
CREATE INDEX "FairBooking_eventDate_idx" ON "FairBooking"("eventDate");

-- AddForeignKey
ALTER TABLE "FairBooking" ADD CONSTRAINT "FairBooking_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "FairEvent"("eventId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FairBooking" ADD CONSTRAINT "FairBooking_fairId_fkey" FOREIGN KEY ("fairId") REFERENCES "Fair"("fairId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FairBooking" ADD CONSTRAINT "FairBooking_bookingDetailId_fkey" FOREIGN KEY ("bookingDetailId") REFERENCES "BookingDetail"("bookingDetailId") ON DELETE CASCADE ON UPDATE CASCADE;
