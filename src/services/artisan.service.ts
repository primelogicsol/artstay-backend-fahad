import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";
import { Request } from "express";

export const artisanService = {
  getApplicationStatus: async (accountId: string) => {
    try {
      const application = await prisma.artisan.findUnique({
        where: {
          accountId: accountId,
        },
        include: {
          craft: true,
          subCraft: true,
        },
      });
      return {
        status: "success",
        message: "application status",
        data: application,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch application status");
    }
  },
  toggleStatus: async (req: Request) => {
    try {
      const { artisanId, status } = req.body;
      await prisma.artisan.update({
        where: {
          artisanId: artisanId,
        },
        data: {
          isActive: status,
        },
      });
      return {
        status: "success",
        message: "artisan toggle status",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch application status");
    }
  },
  getAllArtisansPagination: async (req: Request) => {
    try {
      const queryParams = req.query;
      const limit = Number(queryParams.limit);
      const skip = Number(queryParams.cursor ?? 0);
      const totalCount = await prisma.artisan.count();

      const artisans: ArtisanDetailProps[] = await prisma.artisan.findMany({
        include: {
          craft: true,
          subCraft: true,
        },
        take: limit,
        skip: skip,
        orderBy: {
          createdAt: "desc",
        },
        distinct: ["artisanId"],
      });

      const nextCursor = skip + limit;
      const hasNextPage = nextCursor < totalCount;

      return {
        status: "success",
        message: "all artisan",
        data: {
          artisans: artisans,
          metadata: {
            cursor: hasNextPage ? nextCursor.toString() : undefined,
            hasNextPage,
            totalItems: totalCount, // Use total count here
            currentPage: Math.floor(skip / limit) + 1,
            totalPages: Math.ceil(totalCount / limit),
          },
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Error in fetching the artisans");
    }
  },
  updateProtfolio: async (req: Request) => {
    try {
      const { accountId, images } = req.body as {
        accountId: string;
        images: string[];
      };
      const artisan = await prisma.artisan.findUnique({
        where: { accountId: accountId },
        select: { artisanId: true },
      });
      if (!artisan) throw new Error("Artisan not found");
      await prisma.portfolio.upsert({
        where: {
          artisanId: artisan.artisanId,
        },
        create: {
          artisanId: artisan.artisanId,
          images: images,
        },
        update: {
          images: images,
        },
      });

      return {
        status: "success",
        message: "portfolio updated",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to uploadportfolio");
    }
  },
  getPortfolioByArtisanId: async (req: Request) => {
    try {
      const { artisanId } = req.params;
      const portfolio = await prisma.portfolio.findUnique({
        where: {
          artisanId: artisanId,
        },
      });
      return {
        status: "success",
        message: "portfolio fetched",
        data: portfolio,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch portfolio");
    }
  },
  getPortfolioByAccountId: async (req: Request) => {
    try {
      const { accountId } = req.params;
      const artisan = await prisma.artisan.findUnique({
        where: { accountId: accountId },
        select: { artisanId: true },
      });
      if (!artisan) throw new Error("Artisan not found");
      const portfolio = await prisma.portfolio.findUnique({
        where: {
          artisanId: artisan.artisanId,
        },
      });
      return {
        status: "success",
        message: "portfolio fetched",
        data: portfolio,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch portfolio");
    }
  },
  createArtisanBooking: async (req: Request) => {
    try {
      const booking = req.body as ArtisanBookingCreationProps;

      const bookingDetail = await prisma.bookingDetail.create({
        data: {
          firstName: booking.firstName,
          lastName: booking.lastName,
          email: booking.email,
          phone: booking.email,
          additionalNote: booking.additionalNote,
        },
      });

      await prisma.artisanBooking.create({
        data: {
          startDate: booking.startDate,
          endDate: booking.endDate,
          packageId: booking.packageId,
          artisanId: booking.artisanId,
          bookingDetailId: bookingDetail.bookingDetailId,
        },
      });

      return {
        status: "success",
        message: "artisan booking created",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create asrtisan booking");
    }
  },
   getAllArtisanBookings: async (accountId: string) => {
    try {
      // Get all bookings for this artisan
      const bookings = await prisma.artisanBooking.findMany({
        where: {
          artisan : {
            accountId: accountId,
          }
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          bookingDetail: {
            select: {
              bookingDetailId: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              additionalNote: true,
            },
          },
          package: {
            select: {
              packageId: true,
              title: true,
              price: true,
              duration: true,
            },
          },
          artisan: {
            select: {
              artisanId: true,
              firstName: true,
              lastName: true,
            }
          }
        },
      });
      
      return {
        status: "success",
        message: "Artisan bookings fetched successfully",
        data: bookings,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch artisan bookings");
    }
  },
};
