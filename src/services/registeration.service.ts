import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";
import {
  Certificate,
  Education,
  Experience,
  Recognition,
  Training,
} from "@prisma/client";
import { hash } from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const registerationService = {
  createArtisan: async (artisan: ArtisanCreationProps) => {
    try {
      const hashedPassword = await hash(artisan.password, 10);

      const account = await prisma.account.create({
        data: {
          email: artisan.email,
          password: hashedPassword,
          accountType: "ARTISAN" as AccountTypeEnum,
        },
      });

      await prisma.artisan.create({
        data: {
          firstName: artisan.firstName,
          lastName: artisan.lastName,
          address: artisan.address,
          description: artisan.description,
          dp: artisan.dp,
          experience: artisan.experience as Experience,
          education: artisan.education as Education,
          certificate: artisan.certificate as Certificate,
          training: artisan.training as Training,
          recongnition: artisan.recognition as Recognition,
          subCraftId: artisan.subCraftId,
          craftId: artisan.craftId,
          accountId: account.userId,
        },
      });

      return { status: "success", message: "artisan created", data: null };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new Error(error.message);
      }
      logger.error(error);
      throw new Error("Failed to create artisan");
    }
  },
  updateArtisan: async (artisan: ArtisanUpdationProps) => {
    try {
      await prisma.artisan.update({
        where: { accountId: artisan.accountId },
        data: {
          firstName: artisan.firstName,
          lastName: artisan.lastName,
          address: artisan.address,
          description: artisan.description,
          dp: artisan.dp,
          experience: artisan.experience as Experience,
          education: artisan.education as Education,
          certificate: artisan.certificate as Certificate,
          training: artisan.training as Training,
          recongnition: artisan.recognition as Recognition,
          subCraftId: artisan.subCraftId,
          craftId: artisan.craftId,
        },
      });
      return { status: "success", message: "artisan updated", data: null };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to update artisan",
        data: null,
      };
    }
  },
  createSafari: async (safari: SafariCreationProps) => {
    try {
      const hashedPassword = await hash(safari.password, 10);
      const account = await prisma.account.create({
        data: {
          email: safari.email,
          password: hashedPassword,
          accountType: "SAFARI" as AccountTypeEnum,
        },
      });

      await prisma.safari.create({
        data: {
          firstName: safari.firstName,
          lastName: safari.lastName,
          address: safari.address,
          description: safari.description,
          dp: safari.dp,
          accountId: account.userId,
        },
      });
      return { status: "success", message: "safari created", data: null };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to create safari",
        data: null,
      };
    }
  },
  updateSafari: async (safari: SafariUpdationProps) => {
    try {
      await prisma.safari.update({
        where: { accountId: safari.accountId },
        data: {
          firstName: safari.firstName,
          lastName: safari.lastName,
        },
      });
      return { status: "success", message: "safari updated", data: null };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to update safari",
        data: null,
      };
    }
  },
  createFair: async (fair: FairCreationProps) => {
    try {
      const hashedPassword = await hash(fair.password, 10);
      const account = await prisma.account.create({
        data: {
          email: fair.email,
          password: hashedPassword,
          accountType: "FAIRS" as AccountTypeEnum,
        },
      });

      await prisma.fair.create({
        data: {
          firstName: fair.firstName,
          lastName: fair.lastName,
          address: fair.address,
          description: fair.description,
          dp: fair.dp,
          accountId: account.userId,
        },
      });
      return { status: "success", message: "fair created", data: null };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to create fair",
        data: null,
      };
    }
  },
  updateFair: async (fair: FairUpdationProps) => {
    try {
      await prisma.fair.update({
        where: { accountId: fair.accountId },
        data: {
          firstName: fair.firstName,
          lastName: fair.lastName,
        },
      });
      return { status: "success", message: "fair updated", data: null };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to update fair",
        data: null,
      };
    }
  },
  createShop: async (vendorData: ShopCreationProps) => {
    try {
      const hashedPassword = await hash(vendorData.password, 10);
      const account = await prisma.account.create({
        data: {
          email: vendorData.email,
          password: hashedPassword,
          accountType: "BUSINESS" as AccountTypeEnum,
        },
      });

      await prisma.shop.create({
        data: {
          businessName: vendorData.businessName,
          shopName: vendorData.shopName,
          vendorType: vendorData.vendorType,
          address: vendorData.address,
          city: vendorData.city,
          state: vendorData.state,
          country: vendorData.country,
          zipCode: vendorData.zipCode,
          ownerName: vendorData.ownerName,
          phoneNumber: vendorData.phoneNumber,
          website: vendorData.website,
          description: vendorData.description,
          productCategories: vendorData.productCategories,
          isGICertified: vendorData.isGICertified,
          isHandmade: vendorData.isHandmade,
          pickupOptions: vendorData.pickupOptions,
          deliveryTime: vendorData.deliveryTime,
          deliveryFee: vendorData.deliveryFee,
          pricingStructure: vendorData.pricingStructure,
          orderProcessing: vendorData.orderProcessing,
          paymentMethods: vendorData.paymentMethods,
          returnPolicy: vendorData.returnPolicy,
          stockAvailability: vendorData.stockAvailability,
          offersCustomization: vendorData.offersCustomization,
          packagingType: vendorData.packagingType,
          shopTiming: vendorData.shopTiming,
          workingDays: vendorData.workingDays,
          agreedToTerms: vendorData.agreedToTerms,
          agreedToBlacklist: vendorData.agreedToBlacklist,
          dp: vendorData.dp,
          accountId: account.userId,
        },
      });

      return {
        status: "success",
        message: "Vendor registration successful",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to register vendor",
        data: null,
      };
    }
  },
  updateShop: async (shop: ShopUpdationProps) => {
    try {
      await prisma.shop.update({
        where: { accountId: shop.accountId },
        data: {
          shopName: shop.shopName,
          address: shop.address,
          shopTiming: shop.shopTiming,
          workingDays: shop.workingDays,
          description: shop.description,
          dp: shop.dp,
        },
      });
      return { status: "success", message: "shop updated", data: null };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to update shop",
        data: null,
      };
    }
  },
  createRestaurant: async (restaurant: RestaurantCreationProps) => {
    try {
      const hashedPassword = await hash(restaurant.password, 10);
      const account = await prisma.account.create({
        data: {
          email: restaurant.email,
          password: hashedPassword,
          accountType: "RESTAURANT" as AccountTypeEnum,
        },
      });
      await prisma.restaurant.create({
        data: {
          name: restaurant.name,
          description: restaurant.description,
          location: restaurant.location,
          cuisine: restaurant.cuisine,
          priceRange: restaurant.priceRange,
          image: restaurant.image,
          accountId: account.userId,
        },
      });

      return { status: "success", message: "restaurant created", data: null };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to create restaurant",
        data: null,
      };
    }
  },
  updateRestaurant: async (restaurant: RestaurantUpdationProps) => {
    try {
      await prisma.restaurant.update({
        where: { restaurantId: restaurant.restaurantId },
        data: {
          name: restaurant.name,
          description: restaurant.description,
          location: restaurant.location,
          priceRange: restaurant.priceRange,
          image: restaurant.image,
        },
      });
      return { status: "success", message: "restaurant updated", data: null };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to update restaurant",
        data: null,
      };
    }
  },
  createTravelPlaner: async (travelPlaner: TravelPlanerCreationProps) => {
    try {
      const hashedPassword = await hash(travelPlaner.password, 10);
      const account = await prisma.account.create({
        data: {
          email: travelPlaner.email,
          password: hashedPassword,
          accountType: "TRAVEL_PLANER" as AccountTypeEnum,
        },
      });
      await prisma.travelPlaner.create({
        data: {
          name: travelPlaner.name,
          description: travelPlaner.description,
          location: travelPlaner.location,
          priceRange: travelPlaner.priceRange,
          language: travelPlaner.language,
          speciality: travelPlaner.speciality,
          dp: travelPlaner.dp,
          accountId: account.userId,
        },
      });
      return {
        status: "success",
        message: "travel planer created",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to create travel planer",
        data: null,
      };
    }
  },
  updateTravelPlaner: async (travelPlaner: TravelPlanerUpdationProps) => {
    try {
      await prisma.travelPlaner.update({
        where: { accountId: travelPlaner.accountId },
        data: {
          name: travelPlaner.name,
          description: travelPlaner.description,
          location: travelPlaner.location,
          priceRange: travelPlaner.priceRange,
          language: travelPlaner.language,
          speciality: travelPlaner.speciality,
          dp: travelPlaner.dp,
        },
      });
      return {
        status: "success",
        message: "travel planer updated",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to update travel planer",
        data: null,
      };
    }
  },
  createHotel: async (hotel: HotelCreationProps) => {
    try {
      const hashedPassword = await hash(hotel.password, 10);
      const account = await prisma.account.create({
        data: {
          email: hotel.email,
          password: hashedPassword,
          accountType: "HOTEL" as AccountTypeEnum,
        },
      });

      await prisma.hotel.create({
        data: {
          name: hotel.hotelName,
          address: hotel.address,
          description: hotel.description,
          firstName: hotel.firstName,
          lastName: hotel.lastName,
          email: hotel.email,
          phone: hotel.phone,
          longitude: hotel.longitude ,
          latitude: hotel.latitude,
          checkIn: hotel.checkIn,
          checkOut: hotel.checkOut,
          accountId: account.userId,
        },
      });

      return {
        status: "success",
        message: "Hotel created successfully",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to create hotel",
        data: null,
      };
    }
  },
  createLanguageService: async (data: LanguageServiceCreationProps) => {
    try {
      const hashedPassword = await hash(data.password, 10);
      const account = await prisma.account.create({
        data: {
          email: data.email,
          password: hashedPassword,
          accountType: "LANGUAGE" as AccountTypeEnum,
        },
      });
      await prisma.languageService.create({
        data: {
          profileName: data.profileName,
          firstName: data.firstName,
          lastName: data.lastName,
          description: data.description,
          experience: data.experience,
          languages: data.languages,
          specialization: data.specialization,
          hourlyRate: data.hourlyRate,
          minBookingHours: data.minBookingHours,
          maxBookingHours: data.maxBookingHours,
          availability: data.availability,
          startTime: data.startTime,
          endTime: data.endTime,
          location: data.location,
          serviceMode: data.serviceMode,
          certification: data.certification,
          qualification: data.qualification,
          profileImage: data.profileImage,
          portfolio: data.portfolio,
          accountId: account.userId,
        },
      });

      return {
        status: "success",
        message: "Language service created successfully",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create language service");
    }
  },
  updateLanguageService: async (data: LanguageServiceUpdateProps) => {
    try {
      const { languageServiceId, ...updateData } = data;

      const languageService = await prisma.languageService.update({
        where: {
          languageServiceId: languageServiceId,
        },
        data: updateData,
      });

      return {
        status: "success",
        message: "Language service updated successfully",
        data: languageService,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update language service");
    }
  },
  createEcoTransit: async (ecoTransit: EcoTransitCreationProps) => {
    try {
      const existingAccount = await prisma.account.findUnique({
        where: { email: ecoTransit.email },
      });
      if (existingAccount) {
        throw new Error("Account already exists with this email");
      }

      const hashedPassword = await hash(ecoTransit.password, 10);

      const account = await prisma.account.create({
        data: {
          email: ecoTransit.email,
          password: hashedPassword,
          accountType: "ECO_TRANSIT",
        },
      });

      const newEcoTransit = await prisma.ecoTransit.create({
        data: {
          name: ecoTransit.name,
          address: ecoTransit.address,
          description: ecoTransit.description,
          dp: ecoTransit.dp,
          accountId: account.userId,
        },
      });

      return {
        status: "success",
        message: "eco transit created",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create eco transit");
    }
  },
  updateEcoTransit: async (ecoTransit: EcoTransitUpdationProps) => {
    try {
      await prisma.ecoTransit.update({
        where: { accountId: ecoTransit.accountId },
        data: {
          name: ecoTransit.name,
          address: ecoTransit.address,
          description: ecoTransit.description,
          dp: ecoTransit.dp,
        },
      });

      return {
        status: "success",
        message: "eco transit updated",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update eco transit");
    }
  },
};
