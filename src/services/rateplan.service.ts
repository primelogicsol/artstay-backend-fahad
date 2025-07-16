import { Request } from "express";
import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";

export const ratePlanService = {
  getRatePlansById: async (ratePlanId: string) => {
    try {
      const ratePlan: RatePlanProps | null = await prisma.ratePlan.findUnique({
        where: { ratePlanId: ratePlanId },
      });
      if (!ratePlan) throw new Error("Rate plan not found");
      return {
        status: "success",
        message: "Rate plan fetched successfully",
        data: ratePlan,
      };
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
        throw new Error(error.message);
      }
      logger.error(error);
      throw new Error("Something went wrong");
    }
  },
  getRoomRateByRoomId: async (roomId: string) => {
    try {
      const ratePlan: RatePlanDetailProps[] = await prisma.ratePlan.findMany({
        where: {
          roomrateplans: {
            some: {
              roomId: roomId,
            },
          },
        },
        include: {
          roomrateplans: {
            where: {
              roomId: roomId,
            },
            select: {
              rrpId: true,
              occupancy: true,
              room: {
                select: {
                  roomId: true,
                  capacity: true,
                },
              },
            },
          },
        },
      });

      return {
        status: "success",
        message: "Room rate plan fetched successfully",
        data: ratePlan,
      };
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
        throw new Error(error.message);
      }
      logger.error(error);
      throw new Error("Something went wrong");
    }
  },
  getRoomRatePlanByRoomId: async (roomId: string) => {
    try {
      const roomRatePlan = await prisma.roomRatePlan.findMany({
        where: {
          roomId: roomId,
          rate: { isActive: true },
        },
        include: {
          room: {
            select: {
              quantity: true,
              minimumstay: true,
            },
          },
          rate: {
            select: {
              ratePlanId: true,
              code: true,
              name: true,
            },
          },
        },
      });
      if (!roomRatePlan) throw new Error("Room rate plan not found");
      return {
        status: "success",
        message: "Room rate plan fetched successfully",
        data: roomRatePlan,
      };
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
        throw new Error(error.message);
      }
      logger.error(error);
      throw new Error("Something went wrong");
    }
  },
  getRatePlanBySellerId: async (accountId: string) => {
    try {
      const rates: RatePlanHotelDetailProps[] = await prisma.ratePlan.findMany({
        where: {
          hotel: {
            accountId: accountId,
          },
        },
        include: {
          hotel: {
            select: {
              hotelId: true,
              name: true,
              code: true,
              accountId: true,
            },
          },
        },
      });
      return {
        status: "success",
        message: "Rate plans fetched successfully",
        data: rates,
      };
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
        throw new Error(error.message);
      }
      logger.error(error);
      throw new Error("Something went wrong");
    }
  },
  createRatePlan: async (req: Request) => {
    try {
      const ratePlanCreation: RatePlanCreationProps = req.body;

      await Promise.all([
        prisma.ratePlan.create({
          data: {
            name: ratePlanCreation.rateName,
            description: ratePlanCreation.description,
            mealId: +ratePlanCreation.mealId,
            hotel: {
              connect: {
                accountId: ratePlanCreation.accountId,
              },
            },
          },
        }),
        logger.info({
          logType: "Rate plan creation",
          logDetail: JSON.stringify(ratePlanCreation),
        }),
      ]);
      return {
        status: "success",
        message: "Rate plan created successfully",
        data: null,
      };
    } catch (error) {
      await logger.error({
        logType: "Rate plan creation error",
        logDetail: JSON.stringify(error),
      });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },
  updateRatePlan: async (req: Request) => {
    try {
      const ratePlanUpdate: RatePlanUpdateProps = req.body;

      await Promise.all([
        prisma.ratePlan.update({
          where: { ratePlanId: ratePlanUpdate.rateId },
          data: {
            name: ratePlanUpdate.rateName,
            description: ratePlanUpdate.description,
            mealId: +ratePlanUpdate.mealId,
          },
        }),
        logger.info({
          logType: "Rate plan updation",
          logDetail: JSON.stringify(ratePlanUpdate),
        }),
      ]);
      return {
        status: "success",
        message: "Rate plan updated successfully",
        data: null,
      };
    } catch (error) {
      await logger.error({
        logType: "Rate plan updation error",
        logDetail: JSON.stringify(error),
      });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },
  toggleRateStatus: async (req: Request) => {
    try {
      const ratePlanUpdate: RatePlanStatusUpdateProps = req.body;

      await Promise.all([
        prisma.ratePlan.update({
          where: {
            ratePlanId: ratePlanUpdate.rateId,
          },
          data: {
            isActive: !ratePlanUpdate.status,
          },
        }),
        logger.info({
          logType: "Rate plan status updation",
          logDetail: JSON.stringify(ratePlanUpdate),
        }),
      ]);
      return {
        status: "success",
        message: "Rate plan status updated successfully",
        data: null,
      };
    } catch (error) {
      await logger.error({
        logType: "Rate plan status updation error",
        logDetail: JSON.stringify(error),
      });

      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },
  deleteRatePlan: async (req: Request) => {
    try {
      const ratePlanDelete: RatePlanDeleteProps = req.body;

      await prisma.$transaction(async (tx) => {
        await tx.ratePlan.delete({
          where: { ratePlanId: ratePlanDelete.rateId },
        });
        await tx.roomRatePlan.deleteMany({
          where: { rateId: ratePlanDelete.rateId },
        });
      });

      await logger.info({
        logType: "rate plan deletion",
        logDetail: JSON.stringify(ratePlanDelete),
      });

      return {
        status: "success",
        message: "Rate plan deleted successfully",
        data: null,
      };
    } catch (error) {
      await logger.error({
        logType: "Rate plan deletion error",
        logDetail: JSON.stringify(error),
      });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },
  getAllAssignedRoomsByRateId: async (rateId: string) => {
    try {
      const assignedRooms = await prisma.roomRatePlan.findMany({
        where: { rateId: rateId },
        select: {
          rateId: true,
          roomId: true,
          occupancy: true,
          room: {
            select: {
              roomId: true,
              name: true,
            },
          },
        },
      });
      return {
        status: "success",
        message: "Assigned rooms fetched successfully",
        data: assignedRooms,
      };
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
        throw new Error(error.message);
      }
      logger.error(error);
      throw new Error("Something went wrong");
    }
  },
  getAllRoomsByRateId: async (sellerId: string) => {
    try {
      const rooms = await prisma.room.findMany({
        where: {
          hotel: {
            accountId: sellerId,
          },
        },
        select: {
          roomId: true,
          name: true,
          quantity: true,
          hotelId: true,
          hotel: {
            select: {
              name: true,
            },
          },
        },
      });
      return {
        status: "success",
        message: "Rooms with rate plan fetched successfully",
        data: rooms,
      };
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
        throw new Error(error.message);
      }
      logger.error(error);
      throw new Error("Something went wrong");
    }
  },
  createRoomRatePlan: async (
    roomRatePlanCreation: RoomRatePlanCreationProps
  ) => {
    try {
      await Promise.all([
        prisma.roomRatePlan.create({
          data: {
            rateId: roomRatePlanCreation.rateId,
            roomId: roomRatePlanCreation.roomId,
            occupancy: roomRatePlanCreation.occupancy,
          },
        }),
        logger.info({
          logType: "Room rate plan creation",
          logDetail: JSON.stringify(roomRatePlanCreation),
        }),
      ]);
      return {
        status: "success",
        message: "Room rate plan created successfully",
        data: null,
      };
    } catch (error) {
      await logger.error({
        logType: "Room rate plan creation error",
        logDetail: JSON.stringify(error),
      });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },
  deleteRoomRatePlan: async (req: Request) => {
    try {
      const roomRatePlanDelete = req.body as {
        rateId: string;
        roomId: string;
        occupancy: number;
      };
      await Promise.all([
        prisma.roomRatePlan.delete({
          where: {
            roomId_rateId_occupancy: {
              roomId: roomRatePlanDelete.roomId,
              rateId: roomRatePlanDelete.rateId,
              occupancy: roomRatePlanDelete.occupancy,
            },
          },
        }),
        logger.info({
          logType: "Room rate plan deletion",
          logDetail: JSON.stringify(roomRatePlanDelete),
        }),
      ]);
      return {
        status: "success",
        message: "Room rate plan deleted successfully",
        data: null,
      };
    } catch (error) {
      await logger.error({
        logType: "Room rate plan deletion error",
        logDetail: JSON.stringify(error),
      });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },
};
