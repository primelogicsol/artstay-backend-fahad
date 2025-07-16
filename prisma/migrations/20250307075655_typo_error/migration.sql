/*
  Warnings:

  - The values [MEUSEUM] on the enum `FairType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FairType_new" AS ENUM ('FAIR', 'EXHIBITION', 'MUSEUM');
ALTER TABLE "FairEvent" ALTER COLUMN "fairType" DROP DEFAULT;
ALTER TABLE "FairEvent" ALTER COLUMN "fairType" TYPE "FairType_new" USING ("fairType"::text::"FairType_new");
ALTER TYPE "FairType" RENAME TO "FairType_old";
ALTER TYPE "FairType_new" RENAME TO "FairType";
DROP TYPE "FairType_old";
ALTER TABLE "FairEvent" ALTER COLUMN "fairType" SET DEFAULT 'FAIR';
COMMIT;
