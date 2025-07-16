import { Request, Response } from "express";
import { logger } from "~/utils/logger";
import { registerationService } from "~/services/registeration.service";
import { travelService } from "~/services/travel.service";
import { languageService } from "~/services/language.service";

export const createArtisan = async (req: Request, res: Response) => {
  try {
    const result = await registerationService.createArtisan(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to create artisan",
      data: null,
    });
  }
};

export const updateArtisan = async (req: Request, res: Response) => {
  try {
    const result = await registerationService.updateArtisan(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to update artisan",
      data: null,
    });
  }
};

export const createSafari = async (req: Request, res: Response) => {
  try {
    const result = await registerationService.createSafari(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to create safari",
      data: null,
    });
  }
};

export const updateSafari = async (req: Request, res: Response) => {
  try {
    const result = await registerationService.updateSafari(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to update safari",
      data: null,
    });
  }
};

export const createFair = async (req: Request, res: Response) => {
  try {
    const result = await registerationService.createFair(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to create fair",
      data: null,
    });
  }
};

export const updateFair = async (req: Request, res: Response) => {
  try {
    const result = await registerationService.updateFair(req.body);
    res.status(201).json(result);
    res
      .status(201)
      .json({ status: "success", message: "fair updated", data: null });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to update fair",
      data: null,
    });
  }
};

export const createShop = async (req: Request, res: Response) => {
  try {
    const result = await registerationService.createShop(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to create shop",
      data: null,
    });
  }
};

export const updateShop = async (req: Request, res: Response) => {
  try {
    const result = await registerationService.updateShop(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to update shop",
      data: null,
    });
  }
};

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const result = await registerationService.createRestaurant(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to create restaurant",
      data: null,
    });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const result = await registerationService.updateRestaurant(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to update restaurant",
      data: null,
    });
  }
};

export const createTravelPlaner = async (req: Request, res: Response) => {
  try {
    const result = await registerationService.createTravelPlaner(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to create travel planer",
      data: null,
    });
  }
};

export const createHotel = async (req: Request, res: Response) => {
  try {
    const result = await registerationService.createHotel(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to create travel planer",
      data: null,
    });
  }
};

export const createTravelBooking = async (req: Request, res: Response) => {
  try {
    const result = await travelService.toggleStatus(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to update travel planer",
      data: null,
    });
  }
};

export const updateTravelPlaner = async (req: Request, res: Response) => {
  try {
    const result = await travelService.toggleStatus(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to update travel planer",
      data: null,
    });
  }
};

export const createLanguageService = async (req: Request, res: Response) => {
  try {
    const languageService = req.body;
    const result = await registerationService.createLanguageService(
      languageService
    );
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to create language service",
      data: null,
    });
  }
};

export const updateLanguageService = async (req: Request, res: Response) => {
  try {
    const { languageServiceId } = req.params;
    const languageService = req.body;
    const result = await registerationService.updateLanguageService({
      ...languageService,
      languageServiceId,
    });
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to update language service",
      data: null,
    });
  }
};

export const deleteLanguageService = async (req: Request, res: Response) => {
  try {
    const { languageServiceId } = req.params;
    const result = await languageService.deleteLanguageService(
      languageServiceId
    );
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete language service",
      data: null,
    });
  }
};

export const createEcoTransit = async (req: Request, res: Response) => {
  try {
    const result = await registerationService.createEcoTransit(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to create eco transit",
      data: null,
    });
  }
};

export const updateEcoTransit = async (req: Request, res: Response) => {
  try {
    const result = await registerationService.updateEcoTransit(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to update eco transit",
      data: null,
    });
  }
};
