-- CreateTable
CREATE TABLE "Fair" (
    "fairId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT 'none',
    "lastName" TEXT NOT NULL DEFAULT 'none',
    "dp" TEXT NOT NULL DEFAULT 'none',
    "address" TEXT NOT NULL DEFAULT 'none',
    "description" TEXT NOT NULL DEFAULT 'none',
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fair_pkey" PRIMARY KEY ("fairId")
);

-- AddForeignKey
ALTER TABLE "Fair" ADD CONSTRAINT "Fair_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
