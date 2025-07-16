/*
  Warnings:

  - Made the column `deliveryFee` on table `Shop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `returnPolicy` on table `Shop` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Shop" ALTER COLUMN "deliveryFee" SET NOT NULL,
ALTER COLUMN "returnPolicy" SET NOT NULL;
