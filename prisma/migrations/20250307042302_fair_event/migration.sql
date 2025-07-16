-- CreateEnum
CREATE TYPE "EventLocation" AS ENUM ('INTERNATIONAL', 'NATIONAL', 'LOCAL');

-- CreateTable
CREATE TABLE "FairEvent" (
    "eventId" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'none',
    "location" "EventLocation" NOT NULL DEFAULT 'LOCAL',
    "vanue" TEXT NOT NULL DEFAULT 'none',
    "startDate" TEXT NOT NULL DEFAULT 'none',
    "endDate" TEXT NOT NULL DEFAULT 'none',
    "organizer" TEXT NOT NULL DEFAULT 'none',
    "fairId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FairEvent_pkey" PRIMARY KEY ("eventId")
);

-- AddForeignKey
ALTER TABLE "FairEvent" ADD CONSTRAINT "FairEvent_fairId_fkey" FOREIGN KEY ("fairId") REFERENCES "Fair"("fairId") ON DELETE CASCADE ON UPDATE CASCADE;
