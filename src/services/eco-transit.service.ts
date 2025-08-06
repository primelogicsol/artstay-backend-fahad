import prisma from '~/libs/prisma';
import { logger } from '~/utils/logger';

export const ecoTransitService = {
  createEcoTransit: async (data: any) => {
    try {
      const ecoTransit = await prisma.ecoTransit.create({ data });
      return { status: 'success', message: 'Eco transit created', data: ecoTransit };
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to create eco transit');
    }
  },
  getEcoTransitDetail: async (transitId: string) => {
    try {
      const ecoTransit = await prisma.ecoTransit.findUnique({
        where: { transitId },
        include: { EcoTransitOption: true },
      });
      return { status: 'success', message: 'Eco transit detail', data: ecoTransit };
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to fetch eco transit detail');
    }
  },
  createEcoTransitOption: async (data: any) => {
    try {
      const option = await prisma.ecoTransitOption.create({ data });
      return { status: 'success', message: 'Eco transit option created', data: option };
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to create eco transit option');
    }
  },
  getEcoTransitOptions: async (transitId: string) => {
    try {
      const options = await prisma.ecoTransitOption.findMany({ where: { transitId } });
      return { status: 'success', message: 'Eco transit options', data: options };
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to fetch eco transit options');
    }
  },
  createEcoTransitBooking: async (data: any) => {
    try {
      // expects: { optionId, transitId, bookingDetailId, travelDate, numberOfPassengers, distance }
      const option = await prisma.ecoTransitOption.findUnique({ where: { optionId: data.optionId } });
      if (!option) throw new Error('Eco transit option not found');
      const totalAmount = data.distance * option.baseFee * data.numberOfPassengers;
      const booking = await prisma.ecoTransitBooking.create({
        data: {
          ...data,
          totalAmount,
        },
      });
      return { status: 'success', message: 'Eco transit booking created', data: booking };
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to create eco transit booking');
    }
  },
  getEcoTransitBookings: async (transitId: string) => {
    try {
      const bookings = await prisma.ecoTransitBooking.findMany({ where: { transitId } });
      return { status: 'success', message: 'Eco transit bookings', data: bookings };
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to fetch eco transit bookings');
    }
  },
  getAllEcoTransits: async () => {
    try {
      // Get all eco transit records with related data
      const ecoTransits = await prisma.ecoTransit.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          account: {
            select: {
              userId: true,
              email: true,
              accountType: true,
            }
          },
          EcoTransitOption: true,
        }
      });
      
      logger.info(`Found ${ecoTransits.length} eco transit records`);
      
      return { status: "success", message: "Eco transit detail", data: ecoTransits };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch eco transits");
    }
  },
  getApplicationStatus: async (accountId: string) => {
    try {
      const application = await prisma.ecoTransit.findUnique({
        where: {
          accountId: accountId,
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
}; 