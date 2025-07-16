-- CreateTable
CREATE TABLE "ArtisanPackage" (
    "packageId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "features" TEXT NOT NULL DEFAULT 'none',
    "experience" TEXT NOT NULL DEFAULT 'none',
    "artisanId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArtisanPackage_pkey" PRIMARY KEY ("packageId")
);

-- AddForeignKey
ALTER TABLE "ArtisanPackage" ADD CONSTRAINT "ArtisanPackage_artisanId_fkey" FOREIGN KEY ("artisanId") REFERENCES "Artisan"("artisanId") ON DELETE CASCADE ON UPDATE CASCADE;
