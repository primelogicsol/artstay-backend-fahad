import dayjs from "dayjs";
import { Request } from "express";
import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";

type PriceCreationProps = {
  hotelId: string;
  roomId: string;
  rateId: string;
  ratePlan: string;
  occupancy: number;
  price: number;
  startDate: string;
  endDate: string;
};

export const priceService = {
  getPriceByPriceId: async (priceId: string) => {
    try {
      const price: PriceProps | null = await prisma.roomPrice.findUnique({
        where: { priceId: priceId },
      });

      if (!price) throw new Error("Price not found");

      return {
        status: "success",
        message: "Price fetched successfully",
        data: price,
      };
    } catch (error) {
      if (error instanceof Error) {
        logger.error("Error fetching price by ID", {
          error: error.message,
          priceId,
        });
        throw new Error(error.message);
      }
      logger.error("Unknown error fetching price", { error, priceId });
      throw new Error("Something went wrong");
    }
  },
  getPriceByRoomRateId: async (roomRateId: string) => {
    try {
      const roomRatePlans: FilteredPricesProps | null =
        await prisma.roomRatePlan.findFirst({
          where: {
            rrpId: roomRateId,
          },
          include: {
            roomprices: {
              select: {
                startDate: true,
                endDate: true,
                planCode: true,
                price: true,
              },
            },
          },
        });

      if (!roomRatePlans) throw new Error("Room rate plan not found");

      return {
        status: "success",
        message: "Room rate plan fetched successfully",
        data: roomRatePlans,
      };
    } catch (error) {
      if (error instanceof Error) {
        logger.error("Error fetching room rate plan", {
          error: error.message,
          roomRateId,
        });
        throw new Error(error.message);
      }
      logger.error("Unknown error fetching room rate plan", {
        error,
        roomRateId,
      });
      throw new Error("Something went wrong");
    }
  },
  getAllPricesBySellerId: async (accountId: string) => {
    try {
      const roomRatePlans: RatePriceProps[] =
        await prisma.roomRatePlan.findMany({
          where: {
            room: {
              hotel: {
                accountId: accountId,
              },
            },
            rate: {
              isActive: true,
            },
          },
          include: {
            rate: {
              select: {
                ratePlanId: true,
                name: true,
                code: true,
              },
            },
            room: {
              select: {
                roomId: true,
                name: true,
                quantity: true,
              },
            },
            roomprices: {
              select: {
                startDate: true,
                endDate: true,
                planCode: true,
                price: true,
              },
            },
          },
        });

      const groupedByRoom: Record<string, GroupedRatePriceProps> = {};

      roomRatePlans.forEach((item) => {
        const { room, ...rateInfo } = item;

        if (!groupedByRoom[item.roomId]) {
          groupedByRoom[item.roomId] = {
            roomId: room.roomId,
            name: room.name,
            occupancy: item.occupancy,
            roomrateplans: [],
          };
        }

        groupedByRoom[item.roomId]!.roomrateplans.push(rateInfo);
      });

      return {
        status: "success",
        message: "Prices fetched successfully",
        data: Object.values(groupedByRoom),
      };
    } catch (error) {
      if (error instanceof Error) {
        logger.error("Error fetching prices by seller ID", {
          error: error.message,
          accountId,
        });
        throw new Error(error.message);
      }
      logger.error("Unknown error fetching prices", { error, accountId });
      throw new Error("Something went wrong");
    }
  },

  createPrice: async (req: Request) => {
    try {
      const priceCreation = req.body as PriceCreationProps;

      const [roomDetails, roomRatePlan] = await Promise.all([
        prisma.room.findUnique({
          where: { roomId: priceCreation.roomId },
          select: { code: true, quantity: true, minimumstay: true },
        }),
        prisma.roomRatePlan.findFirst({
          where: {
            roomId: priceCreation.roomId,
            rateId: priceCreation.rateId,
            occupancy: priceCreation.occupancy,
          },
        }),
      ]);
      
      if (!roomDetails) {
        throw new Error(" room data not found");
      } else if (!roomRatePlan) {
        throw new Error("room rate plan data not found");
      }

      await updateOrCreatePriceRecord(priceCreation, roomRatePlan.rrpId);

      logger.info("Price created successfully", {
        logType: "Price creation",
        priceCreation,
      });

      return {
        status: "success",
        message: "Price created successfully",
        data: null,
      };
    } catch (error) {
      logger.error("Price creation failed", {
        logType: "Price creation error",
        error: error instanceof Error ? error.message : "Unknown error",
      });

      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred during price creation");
    }
  },

  deletePriceByPriceId: async (priceId: string) => {
    try {
      await prisma.roomPrice.delete({
        where: { priceId: priceId },
      });

      logger.info("Price deleted successfully", {
        logType: "Price deletion",
        priceId,
      });

      return {
        status: "success",
        message: "Price deleted successfully",
        data: null,
      };
    } catch (error) {
      logger.error("Price deletion failed", {
        logType: "Price deletion error",
        error: error instanceof Error ? error.message : "Unknown error",
        priceId,
      });

      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },

  deletePricesByPriceIds: async (priceIds: string[]) => {
    try {
      await prisma.roomPrice.deleteMany({
        where: { priceId: { in: priceIds } },
      });

      logger.info("Prices deleted successfully", {
        logType: "Price deletion bulk",
        priceIds,
      });

      return {
        status: "success",
        message: "Prices deleted successfully",
        data: null,
      };
    } catch (error) {
      logger.error("Bulk price deletion failed", {
        logType: "Price deletion bulk error",
        error: error instanceof Error ? error.message : "Unknown error",
        priceIds,
      });

      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },

  createBlockDates: async (req: Request) => {
    try {
      const blockDate: BlockDateCreationProps = req.body;

      const ratePlans = await prisma.roomRatePlan.findMany({
        where: { roomId: blockDate.roomId },
        select: {
          rate: { select: { code: true } },
        },
      });

      if (ratePlans.length === 0)
        throw new Error("Rate plans not found for this room");

      const inputStart = dayjs(blockDate.startDate);
      const inputEnd = dayjs(blockDate.endDate);

      const existingBlocks = await prisma.blockDate.findMany({
        where: {
          roomId: blockDate.roomId,
          OR: [
            {
              startDate: { lte: inputEnd.format("YYYY-MM-DD") },
              endDate: { gte: inputStart.format("YYYY-MM-DD") },
            },
          ],
        },
      });

      const newBlocks = [];
      const blocksToRemove = [];

      for (const block of existingBlocks) {
        const blockStart = dayjs(block.startDate);
        const blockEnd = dayjs(block.endDate);

        if (inputStart <= blockEnd && inputEnd >= blockStart) {
          blocksToRemove.push(block.blockId);

          // If the existing block starts before the requested block,
          // create a new block for the portion before
          if (blockStart < inputStart) {
            newBlocks.push({
              startDate: blockStart,
              endDate: inputStart.subtract(1, "day"),
            });
          }

          // If the existing block ends after the requested block,
          // create a new block for the portion after
          if (blockEnd > inputEnd) {
            newBlocks.push({
              startDate: inputEnd.add(1, "day"),
              endDate: blockEnd,
            });
          }
        }
      }

      // Delete blocks that need to be removed
      if (blocksToRemove.length > 0) {
        await prisma.blockDate.deleteMany({
          where: {
            blockId: {
              in: blocksToRemove,
            },
          },
        });
      }

      // Create new blocks in database
      for (const block of newBlocks) {
        await prisma.blockDate.create({
          data: {
            startDate: block.startDate.format("YYYY-MM-DD"),
            endDate: block.endDate.format("YYYY-MM-DD"),
            roomId: blockDate.roomId,
          },
        });
      }

      // Create the requested block if there were no overlaps
      if (blocksToRemove.length === 0) {
        await prisma.blockDate.create({
          data: {
            startDate: inputStart.format("YYYY-MM-DD"),
            endDate: inputEnd.format("YYYY-MM-DD"),
            roomId: blockDate.roomId,
          },
        });
      }

      logger.info("Block dates created successfully", {
        logType: "Block room",
        blockDate,
        blocksRemoved: blocksToRemove.length,
        newBlocksCreated: newBlocks.length,
      });

      return {
        status: "success",
        message: "Block dates created successfully",
        data: null,
      };
    } catch (error) {
      logger.error("Block date creation failed", {
        logType: "Block date creation error",
        error: error instanceof Error ? error.message : "Unknown error",
      });

      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },

  getBlockDatesByRoomIdAndQuantity: async (req: Request) => {
    try {
      const { roomId, quantity } = req.body;

      // Get room data with just the required fields
      const roomData = await prisma.room.findUnique({
        where: { roomId },
        select: { quantity: true },
      });

      if (!roomData) {
        throw new Error("Room not found");
      }

      // Fetch data in parallel
      const [roomBookings, existingBlockDates] = await Promise.all([
        // Get bookings with relevant fields only
        prisma.roomBooking.findMany({
          where: {
            roomId,
            BookingDetail: {
              status: { not: "cancelled" },
            },
          },
          select: { startDate: true, endDate: true, quantity: true },
        }),

        // Get existing block dates
        prisma.blockDate.findMany({
          where: { roomId },
          select: { startDate: true, endDate: true },
        }),
      ]);

      // Create a map to store the booking quantity for each date
      const dateQuantityMap = new Map<string, number>();
      const blockedDates = new Set<string>();

      // Process existing block dates first
      for (const block of existingBlockDates) {
        let currentDate = dayjs(block.startDate);
        const endDate = dayjs(block.endDate);

        while (currentDate.isSame(endDate) || currentDate.isBefore(endDate)) {
          blockedDates.add(currentDate.format("YYYY-MM-DD"));
          currentDate = currentDate.add(1, "day");
        }
      }

      // Process bookings to calculate availability
      for (const booking of roomBookings) {
        if (!booking.startDate || !booking.endDate || !booking.quantity)
          continue;

        let currentDate = dayjs(booking.startDate);
        const endDate = dayjs(booking.endDate);

        while (currentDate.isSame(endDate) || currentDate.isBefore(endDate)) {
          const dateString = currentDate.format("YYYY-MM-DD");
          const currentQuantity = dateQuantityMap.get(dateString) || 0;
          const newQuantity = currentQuantity + booking.quantity;

          // Check if available rooms are less than requested quantity
          if (roomData.quantity - newQuantity < quantity) {
            blockedDates.add(dateString);
          }

          dateQuantityMap.set(dateString, newQuantity);
          currentDate = currentDate.add(1, "day");
        }
      }

      // Sort blocked dates for processing
      const sortedDates = Array.from(blockedDates).sort();

      if (sortedDates.length === 0) {
        return [];
      }

      // Merge consecutive dates into ranges
      const mergedBlockDates = [];
      let rangeStart = sortedDates[0];
      let rangeEnd = sortedDates[0];

      for (let i = 1; i < sortedDates.length; i++) {
        const currentDate = sortedDates[i];
        const prevDate = sortedDates[i - 1];

        // Check if dates are consecutive
        if (dayjs(currentDate).diff(dayjs(prevDate), "day") === 1) {
          // Extend the current range
          rangeEnd = currentDate;
        } else {
          // Save the completed range and start a new one
          mergedBlockDates.push({ startDate: rangeStart, endDate: rangeEnd });
          rangeStart = currentDate;
          rangeEnd = currentDate;
        }
      }

      // Add the last range
      mergedBlockDates.push({ startDate: rangeStart, endDate: rangeEnd });

      return {
        status: "success",
        message: "Block dates fetched successfully",
        data: mergedBlockDates,
      };
    } catch (error) {
      logger.error("Error fetching block dates by room and quantity", {
        error: error instanceof Error ? error.message : "Unknown error",
      });

      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },

  getBlockDatesByRoomId: async (req: Request) => {
    try {
      const { roomId } = req.body;
      const roomsWithBlockDates = await prisma.blockDate.findMany({
        where: {
          roomId: roomId,
        },
        select: {
          startDate: true,
          endDate: true,
        },
      });

      return {
        status: "success",
        message: "Block dates fetched successfully",
        data: roomsWithBlockDates,
      };
    } catch (error) {
      logger.error("Error fetching block dates by room ID", {
        error: error instanceof Error ? error.message : "Unknown error",
      });

      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },

  getBlockDatesbySellerId: async (sellerId: string) => {
    try {
      const roomsWithBlockDates: BlockDatesResponse[] =
        await prisma.room.findMany({
          where: { hotel: { accountId: sellerId } },
          select: {
            roomId: true,
            blockdates: {
              select: {
                startDate: true,
                endDate: true,
              },
            },
          },
        });

      const result = roomsWithBlockDates.map((room) => ({
        roomId: room.roomId,
        blockdates: room.blockdates.map((date) => ({
          startDate: date.startDate,
          endDate: date.endDate,
        })),
      }));

      return {
        status: "success",
        message: "Block dates fetched successfully",
        data: result,
      };
    } catch (error) {
      logger.error("Error fetching block dates by seller ID", {
        error: error instanceof Error ? error.message : "Unknown error",
        sellerId,
      });

      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },
};

const updateOrCreatePriceRecord = async (
  priceCreation: PriceCreationProps,
  rrpId: string
): Promise<void> => {
  // Find overlapping records
  const overlappingRecords = await prisma.roomPrice.findMany({
    where: {
      rrpId,
      OR: [
        {
          startDate: { lte: priceCreation.endDate },
          endDate: { gte: priceCreation.startDate },
        },
      ],
    },
    select: {
      priceId: true,
      startDate: true,
      endDate: true,
      price: true,
      planCode: true,
    },
  });

  // Check for exact match first
  const exactMatch = overlappingRecords.find(
    (record) =>
      record.startDate === priceCreation.startDate &&
      record.endDate === priceCreation.endDate
  );

  if (exactMatch?.priceId) {
    // Just update the price for an exact match
    await prisma.roomPrice.update({
      where: { priceId: exactMatch.priceId },
      data: { price: priceCreation.price },
    });
    return;
  }

  // Handle overlapping records
  if (overlappingRecords.length > 0) {
    // Step 1: Delete all existing overlapping records
    await prisma.$transaction(
      overlappingRecords.map((record) =>
        prisma.roomPrice.delete({
          where: { priceId: record.priceId },
        })
      )
    );

    // Step 2: Create new records for the non-overlapping parts
    const newRecords = [];

    for (const record of overlappingRecords) {
      // If there's a part before our new range
      if (dayjs(record.startDate).isBefore(dayjs(priceCreation.startDate))) {
        const dayBefore = dayjs(priceCreation.startDate)
          .subtract(1, "day")
          .format("YYYY-MM-DD");

        newRecords.push({
          rrpId,
          startDate: record.startDate,
          endDate: dayBefore,
          planCode: record.planCode,
          price: record.price,
        });
      }

      // If there's a part after our new range
      if (dayjs(record.endDate).isAfter(dayjs(priceCreation.endDate))) {
        const dayAfter = dayjs(priceCreation.endDate)
          .add(1, "day")
          .format("YYYY-MM-DD");

        newRecords.push({
          rrpId,
          startDate: dayAfter,
          endDate: record.endDate,
          planCode: record.planCode,
          price: record.price,
        });
      }
    }

    // Step 3: Create the new price record
    newRecords.push({
      rrpId,
      startDate: priceCreation.startDate,
      endDate: priceCreation.endDate,
      planCode: priceCreation.ratePlan,
      price: priceCreation.price,
    });

    // Create all the new records
    await prisma.$transaction(
      newRecords.map((record) =>
        prisma.roomPrice.create({
          data: record,
        })
      )
    );
  } else {
    // No overlapping records, just create a new one
    await prisma.roomPrice.create({
      data: {
        rrpId,
        startDate: priceCreation.startDate,
        endDate: priceCreation.endDate,
        planCode: priceCreation.ratePlan,
        price: priceCreation.price,
      },
    });
  }
};
