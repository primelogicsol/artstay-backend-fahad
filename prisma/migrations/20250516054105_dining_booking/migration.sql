-- CreateTable
CREATE TABLE "RestaurantBooking" (
    "bookingId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "bookingDetailId" TEXT NOT NULL,
    "resturantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestaurantBooking_pkey" PRIMARY KEY ("bookingId")
);

-- CreateTable
CREATE TABLE "DiningBookingItem" (
    "bookingItemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "bookingId" TEXT NOT NULL,
    "menuItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiningBookingItem_pkey" PRIMARY KEY ("bookingItemId")
);

-- CreateIndex
CREATE INDEX "DiningBookingItem_bookingId_idx" ON "DiningBookingItem"("bookingId");

-- AddForeignKey
ALTER TABLE "RestaurantBooking" ADD CONSTRAINT "RestaurantBooking_resturantId_fkey" FOREIGN KEY ("resturantId") REFERENCES "Restaurant"("restaurantId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantBooking" ADD CONSTRAINT "RestaurantBooking_bookingDetailId_fkey" FOREIGN KEY ("bookingDetailId") REFERENCES "BookingDetail"("bookingDetailId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiningBookingItem" ADD CONSTRAINT "DiningBookingItem_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "RestaurantBooking"("bookingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiningBookingItem" ADD CONSTRAINT "DiningBookingItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("menuItemId") ON DELETE CASCADE ON UPDATE CASCADE;
