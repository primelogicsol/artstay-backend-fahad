-- CreateTable
CREATE TABLE "TravelTour" (
    "tourId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "isPricePerPerson" BOOLEAN NOT NULL DEFAULT true,
    "maxGroupSize" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "languages" TEXT[],
    "features" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "travelPlanerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TravelTour_pkey" PRIMARY KEY ("tourId")
);

-- AddForeignKey
ALTER TABLE "TravelTour" ADD CONSTRAINT "TravelTour_travelPlanerId_fkey" FOREIGN KEY ("travelPlanerId") REFERENCES "TravelPlaner"("travelPlanerId") ON DELETE CASCADE ON UPDATE CASCADE;
