/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `Artisan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `Fair` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `Safari` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Shop" (
    "shopId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'none',
    "address" TEXT NOT NULL DEFAULT 'none',
    "description" TEXT NOT NULL DEFAULT 'none',
    "firstName" TEXT NOT NULL DEFAULT 'none',
    "lastName" TEXT NOT NULL DEFAULT 'none',
    "dp" TEXT NOT NULL DEFAULT 'none',
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("shopId")
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "images" TEXT[],
    "category" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "dimensions" TEXT,
    "weight" DOUBLE PRECISION,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "craftType" TEXT NOT NULL,
    "artisanMade" BOOLEAN NOT NULL DEFAULT true,
    "shopId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_accountId_key" ON "Shop"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Artisan_accountId_key" ON "Artisan"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Fair_accountId_key" ON "Fair"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Safari_accountId_key" ON "Safari"("accountId");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("shopId") ON DELETE CASCADE ON UPDATE CASCADE;
