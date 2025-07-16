import { Request, Response } from "express";
import prisma from "~/libs/prisma";
import { propertyService } from "~/services/property.service";
import { logger } from "~/utils/logger";

export const hotelApplicationtatus = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const result = await propertyService.getApplicationStatus(accountId);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch application status",
      data: null,
    });
  }
};

export const getAllHotels = async (req: Request, res: Response) => {
  try {
    const result = await propertyService.getAllHotels();
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to create product",
      data: null,
    });
  }
};

export const getHotelByAccountId = async (req: Request, res: Response) => {
  try {
    const result = await propertyService.getHotelByAccountId(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to create product",
      data: null,
    });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  try {
    const hotel: HotelUpdateProps = req.body;
    await prisma.hotel.update({
      where: {
        hotelId: hotel.hotelId,
      },
      data: hotel,
    });
    res
      .status(201)
      .json({ status: "success", message: "hotel updated", data: null });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to update hotel",
      data: null,
    });
  }
};


export const getAllRoomsByAccountId = async (req: Request, res: Response) => {
  try {
    const result = await propertyService.getAllRoomsByAccountId(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to get all rooms by hotel id",
      data: null,
    });
  }
};

export const getAllRoomsByHotelId = async (req: Request, res: Response) => {
  try {
    const result = await propertyService.getAllRoomsByHotelId(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to get all rooms by hotel id",
      data: null,
    });
  }
};

export const getRoomByRoomId = async (req: Request, res: Response) => {
  try {
    const result = await propertyService.getRoomByRoomId(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to get all rooms by hotel id",
      data: null,
    });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const result = await propertyService.createRoom(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to get all rooms by hotel id",
      data: null,
    });
  }
};

export const updateRoomStatus = async (req: Request, res: Response) => {
  try {
    const result = await propertyService.toggleStatus(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to update status",
      data: null,
    });
  }
};

export const getAllRoomsForBooking = async (req: Request, res: Response) => {
    try {
        const result = await propertyService.getRoomsBySellerIdForBooking(req.params.sellerId)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}
