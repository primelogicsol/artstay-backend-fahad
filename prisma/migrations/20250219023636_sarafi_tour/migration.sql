-- CreateTable
CREATE TABLE "SafariTour" (
    "tourId" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'none',
    "operator" TEXT NOT NULL DEFAULT 'none',
    "description" TEXT NOT NULL DEFAULT 'nones',
    "duration" INTEGER NOT NULL DEFAULT 0,
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "fee" INTEGER NOT NULL DEFAULT 0,
    "safariId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SafariTour_pkey" PRIMARY KEY ("tourId")
);

-- AddForeignKey
ALTER TABLE "SafariTour" ADD CONSTRAINT "SafariTour_safariId_fkey" FOREIGN KEY ("safariId") REFERENCES "Safari"("safariId") ON DELETE CASCADE ON UPDATE CASCADE;
