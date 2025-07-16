-- CreateTable
CREATE TABLE "Hotel" (
    "hotelId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'none',
    "address" TEXT NOT NULL DEFAULT 'none',
    "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "description" TEXT NOT NULL DEFAULT 'none',
    "firstName" TEXT NOT NULL DEFAULT 'none',
    "lastName" TEXT NOT NULL DEFAULT 'none',
    "email" TEXT NOT NULL DEFAULT 'none',
    "phone" TEXT NOT NULL DEFAULT 'none',
    "checkIn" TEXT NOT NULL DEFAULT 'none',
    "checkOut" TEXT NOT NULL DEFAULT 'none',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("hotelId")
);

-- CreateTable
CREATE TABLE "Room" (
    "roomId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'none',
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "area" INTEGER NOT NULL DEFAULT 0,
    "features" TEXT[],
    "description" TEXT NOT NULL DEFAULT 'none',
    "roomType" TEXT NOT NULL DEFAULT 'none',
    "dp" TEXT NOT NULL DEFAULT 'none',
    "beds" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "minimumstay" INTEGER NOT NULL DEFAULT 1,
    "pictures" TEXT[],
    "hotelId" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "RatePlan" (
    "ratePlanId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'none',
    "description" TEXT NOT NULL DEFAULT 'none',
    "mealId" INTEGER NOT NULL DEFAULT 15,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "hotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RatePlan_pkey" PRIMARY KEY ("ratePlanId")
);

-- CreateTable
CREATE TABLE "RoomRatePlan" (
    "rrpId" TEXT NOT NULL,
    "occupancy" INTEGER NOT NULL DEFAULT 0,
    "hotelName" TEXT NOT NULL DEFAULT 'none',
    "hotelId" TEXT NOT NULL DEFAULT 'none',
    "rateId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomRatePlan_pkey" PRIMARY KEY ("rrpId")
);

-- CreateTable
CREATE TABLE "RoomPrice" (
    "priceId" TEXT NOT NULL,
    "startDate" TEXT NOT NULL DEFAULT 'none',
    "endDate" TEXT NOT NULL DEFAULT 'none',
    "planCode" TEXT NOT NULL DEFAULT 'none',
    "price" INTEGER NOT NULL DEFAULT 0,
    "rrpId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomPrice_pkey" PRIMARY KEY ("priceId")
);

-- CreateTable
CREATE TABLE "RoomBooking" (
    "bookingId" TEXT NOT NULL,
    "startDate" TEXT NOT NULL DEFAULT 'none',
    "endDate" TEXT NOT NULL DEFAULT 'none',
    "price" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "adults" INTEGER NOT NULL DEFAULT 1,
    "children" INTEGER NOT NULL DEFAULT 0,
    "extras" TEXT[],
    "bookingDetailId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isRefund" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomBooking_pkey" PRIMARY KEY ("bookingId")
);

-- CreateTable
CREATE TABLE "BookingDetail" (
    "bookingDetailId" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'none',
    "country" TEXT NOT NULL DEFAULT 'none',
    "dob" TEXT NOT NULL DEFAULT 'none',
    "phone" TEXT NOT NULL DEFAULT 'none',
    "zip" TEXT NOT NULL DEFAULT 'none',
    "address" TEXT NOT NULL DEFAULT 'none',
    "firstName" TEXT NOT NULL DEFAULT 'none',
    "lastName" TEXT NOT NULL DEFAULT 'none',
    "email" TEXT NOT NULL DEFAULT 'none',
    "arrivalTime" TEXT NOT NULL DEFAULT 'none',
    "additionalInfo" TEXT NOT NULL DEFAULT 'none',
    "status" TEXT NOT NULL DEFAULT 'new',
    "bookingReservationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookingDetail_pkey" PRIMARY KEY ("bookingDetailId")
);

-- CreateTable
CREATE TABLE "BlockDate" (
    "blockId" TEXT NOT NULL,
    "startDate" TEXT NOT NULL DEFAULT 'none',
    "endDate" TEXT NOT NULL DEFAULT 'none',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "BlockDate_pkey" PRIMARY KEY ("blockId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_accountId_key" ON "Hotel"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_code_key" ON "Hotel"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Room_code_key" ON "Room"("code");

-- CreateIndex
CREATE UNIQUE INDEX "RatePlan_code_key" ON "RatePlan"("code");

-- CreateIndex
CREATE INDEX "RoomRatePlan_roomId_rateId_idx" ON "RoomRatePlan"("roomId", "rateId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomRatePlan_roomId_rateId_occupancy_key" ON "RoomRatePlan"("roomId", "rateId", "occupancy");

-- CreateIndex
CREATE INDEX "BookingDetail_bookingReservationId_idx" ON "BookingDetail"("bookingReservationId");

-- CreateIndex
CREATE UNIQUE INDEX "BookingDetail_bookingReservationId_key" ON "BookingDetail"("bookingReservationId");

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("hotelId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatePlan" ADD CONSTRAINT "RatePlan_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("hotelId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomRatePlan" ADD CONSTRAINT "RoomRatePlan_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomRatePlan" ADD CONSTRAINT "RoomRatePlan_rateId_fkey" FOREIGN KEY ("rateId") REFERENCES "RatePlan"("ratePlanId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomPrice" ADD CONSTRAINT "RoomPrice_rrpId_fkey" FOREIGN KEY ("rrpId") REFERENCES "RoomRatePlan"("rrpId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomBooking" ADD CONSTRAINT "RoomBooking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomBooking" ADD CONSTRAINT "RoomBooking_bookingDetailId_fkey" FOREIGN KEY ("bookingDetailId") REFERENCES "BookingDetail"("bookingDetailId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockDate" ADD CONSTRAINT "BlockDate_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE CASCADE ON UPDATE CASCADE;
