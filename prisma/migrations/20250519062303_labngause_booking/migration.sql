-- CreateTable
CREATE TABLE "LanguageServiceBooking" (
    "languageBookingId" TEXT NOT NULL,
    "bookingDate" TEXT NOT NULL DEFAULT 'none',
    "bookingTime" TEXT NOT NULL DEFAULT 'none',
    "hours" INTEGER NOT NULL DEFAULT 1,
    "sourceLanguage" TEXT NOT NULL DEFAULT 'none',
    "targetLanguage" TEXT NOT NULL DEFAULT 'none',
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'new',
    "languageServiceId" TEXT NOT NULL,
    "bookingDetailId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LanguageServiceBooking_pkey" PRIMARY KEY ("languageBookingId")
);

-- CreateIndex
CREATE INDEX "LanguageServiceBooking_languageServiceId_idx" ON "LanguageServiceBooking"("languageServiceId");

-- CreateIndex
CREATE INDEX "LanguageServiceBooking_bookingDate_idx" ON "LanguageServiceBooking"("bookingDate");

-- AddForeignKey
ALTER TABLE "LanguageServiceBooking" ADD CONSTRAINT "LanguageServiceBooking_languageServiceId_fkey" FOREIGN KEY ("languageServiceId") REFERENCES "LanguageService"("languageServiceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageServiceBooking" ADD CONSTRAINT "LanguageServiceBooking_bookingDetailId_fkey" FOREIGN KEY ("bookingDetailId") REFERENCES "BookingDetail"("bookingDetailId") ON DELETE CASCADE ON UPDATE CASCADE;
