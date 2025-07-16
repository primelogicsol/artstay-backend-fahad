-- CreateTable
CREATE TABLE "Safari" (
    "safariId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT 'none',
    "lastName" TEXT NOT NULL DEFAULT 'none',
    "dp" TEXT NOT NULL DEFAULT 'none',
    "address" TEXT NOT NULL DEFAULT 'none',
    "description" TEXT NOT NULL DEFAULT 'none',
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Safari_pkey" PRIMARY KEY ("safariId")
);

-- AddForeignKey
ALTER TABLE "Safari" ADD CONSTRAINT "Safari_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
