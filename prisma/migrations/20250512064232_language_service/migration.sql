-- CreateTable
CREATE TABLE "LanguageService" (
    "languageServiceId" TEXT NOT NULL,
    "profileName" TEXT NOT NULL DEFAULT 'none',
    "firstName" TEXT NOT NULL DEFAULT 'none',
    "lastName" TEXT NOT NULL DEFAULT 'none',
    "description" TEXT NOT NULL DEFAULT 'none',
    "experience" TEXT NOT NULL DEFAULT 'none',
    "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "specialization" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "hourlyRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "minBookingHours" INTEGER NOT NULL DEFAULT 1,
    "maxBookingHours" INTEGER NOT NULL DEFAULT 8,
    "availability" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "startTime" TEXT NOT NULL DEFAULT '09:00',
    "endTime" TEXT NOT NULL DEFAULT '18:00',
    "location" TEXT NOT NULL DEFAULT 'none',
    "serviceMode" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "certification" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "qualification" TEXT NOT NULL DEFAULT 'none',
    "profileImage" TEXT NOT NULL DEFAULT 'none',
    "portfolio" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LanguageService_pkey" PRIMARY KEY ("languageServiceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "LanguageService_accountId_key" ON "LanguageService"("accountId");

-- AddForeignKey
ALTER TABLE "LanguageService" ADD CONSTRAINT "LanguageService_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
