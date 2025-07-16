-- CreateTable
CREATE TABLE "TravelPlaner" (
    "travelPlanerId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'none',
    "description" TEXT NOT NULL DEFAULT 'none',
    "location" TEXT NOT NULL DEFAULT 'none',
    "priceRange" TEXT NOT NULL DEFAULT 'none',
    "language" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "speciality" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "TravelPlaner_pkey" PRIMARY KEY ("travelPlanerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TravelPlaner_accountId_key" ON "TravelPlaner"("accountId");

-- AddForeignKey
ALTER TABLE "TravelPlaner" ADD CONSTRAINT "TravelPlaner_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
