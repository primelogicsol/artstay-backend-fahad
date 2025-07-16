/*
  Warnings:

  - The values [ALL,ADMIN] on the enum `AccountType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccountType_new" AS ENUM ('NONE', 'ARTISAN', 'SAFARI', 'FAIRS', 'BUSINESS', 'HOTEL', 'RESTAURANT', 'TRAVEL_PLANER', 'SUPERADMIN', 'ARTISAN_ADMIN', 'SAFARI_ADMIN', 'FAIRS_ADMIN', 'BUSINESS_ADMIN', 'HOTEL_ADMIN', 'RESTAURANT_ADMIN', 'TRAVEL_PLANER_ADMIN');
ALTER TABLE "Account" ALTER COLUMN "accountType" DROP DEFAULT;
ALTER TABLE "Account" ALTER COLUMN "accountType" TYPE "AccountType_new" USING ("accountType"::text::"AccountType_new");
ALTER TYPE "AccountType" RENAME TO "AccountType_old";
ALTER TYPE "AccountType_new" RENAME TO "AccountType";
DROP TYPE "AccountType_old";
ALTER TABLE "Account" ALTER COLUMN "accountType" SET DEFAULT 'NONE';
COMMIT;

-- AlterTable
ALTER TABLE "Artisan" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Fair" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Safari" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TravelPlaner" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;
