-- CreateEnum
CREATE TYPE "Education" AS ENUM ('FORMAL', 'NON_FORMAL');

-- CreateEnum
CREATE TYPE "Training" AS ENUM ('FORMAL', 'NON_FORMAL');

-- CreateEnum
CREATE TYPE "Certificate" AS ENUM ('NONE', 'PROFESSIONAL', 'TRADE', 'WORKSHOP');

-- CreateEnum
CREATE TYPE "Recognition" AS ENUM ('STATE', 'NATIONAL', 'INTERNATIONAL');

-- CreateEnum
CREATE TYPE "Experience" AS ENUM ('APPRENTICE', 'CRAFTMAN', 'MASTER', 'GRANDMASTER');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('NONE', 'ARTISAN', 'SAFARI', 'FAIRS', 'BUSINESS', 'HOTEL', 'ALL', 'ADMIN', 'SUPERADMIN');

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT 'none',
    "accountType" "AccountType" NOT NULL DEFAULT 'NONE',

    CONSTRAINT "Account_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Craft" (
    "craftId" TEXT NOT NULL,
    "craftName" TEXT NOT NULL DEFAULT 'none',
    "craftSlug" TEXT NOT NULL DEFAULT 'none',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Craft_pkey" PRIMARY KEY ("craftId")
);

-- CreateTable
CREATE TABLE "SubCraft" (
    "subCraftId" TEXT NOT NULL,
    "subCraftName" TEXT NOT NULL DEFAULT 'none',
    "subCraftSlug" TEXT NOT NULL DEFAULT 'none',
    "craftId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubCraft_pkey" PRIMARY KEY ("subCraftId")
);

-- CreateTable
CREATE TABLE "Artisan" (
    "artisanId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT 'none',
    "lastName" TEXT NOT NULL DEFAULT 'none',
    "dp" TEXT NOT NULL DEFAULT 'none',
    "address" TEXT NOT NULL DEFAULT 'none',
    "description" TEXT NOT NULL DEFAULT 'none',
    "experience" "Experience" NOT NULL DEFAULT 'APPRENTICE',
    "education" "Education" NOT NULL DEFAULT 'NON_FORMAL',
    "training" "Training" NOT NULL DEFAULT 'NON_FORMAL',
    "certificate" "Certificate" NOT NULL DEFAULT 'NONE',
    "recongnition" "Recognition" NOT NULL DEFAULT 'STATE',
    "craftId" TEXT NOT NULL,
    "subCraftId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artisan_pkey" PRIMARY KEY ("artisanId")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "portfolioId" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY['']::TEXT[],

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("portfolioId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- AddForeignKey
ALTER TABLE "SubCraft" ADD CONSTRAINT "SubCraft_craftId_fkey" FOREIGN KEY ("craftId") REFERENCES "Craft"("craftId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artisan" ADD CONSTRAINT "Artisan_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artisan" ADD CONSTRAINT "Artisan_subCraftId_fkey" FOREIGN KEY ("subCraftId") REFERENCES "SubCraft"("subCraftId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artisan" ADD CONSTRAINT "Artisan_craftId_fkey" FOREIGN KEY ("craftId") REFERENCES "Craft"("craftId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artisan" ADD CONSTRAINT "Artisan_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("portfolioId") ON DELETE CASCADE ON UPDATE CASCADE;
