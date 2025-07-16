-- CreateEnum
CREATE TYPE "FairType" AS ENUM ('FAIR', 'EXHIBITION', 'MEUSEUM');

-- AlterTable
ALTER TABLE "FairEvent" ADD COLUMN     "fairType" "FairType" NOT NULL DEFAULT 'FAIR';
