import { Request, Response } from "express";
import { priceService } from "~/services/price.service";

export const getBlockDatesbySellerId = async (req: Request, res: Response) => {
    try {
        const {sellerId} = req.params;
        const result = await priceService.getBlockDatesbySellerId(sellerId)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }     
}

export const getAllPricesBySellerId = async (req: Request, res: Response) => {
    try {
        const prices = await priceService.getAllPricesBySellerId(req.params.sellerId);
        res.status(200).json(prices);
    } catch (error) {   
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const createPrice = async (req: Request, res: Response) => {
    try {
        const result = await priceService.createPrice(req);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const getPriceByRoomRateId = async (req: Request, res: Response) => {
    try {
        const result = await priceService.getPriceByRoomRateId(req.params.rrpId);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const createBlockDates = async (req: Request, res: Response) => {
    try {
        const result = await priceService.createBlockDates(req);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const getBlockDatesByRoomId = async (req: Request, res: Response) => {
    try {
        const result = await priceService.getBlockDatesByRoomId(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const getBlockByRoomIdAndQuantity = async (req: Request, res: Response) => {
    try {
        const result = await priceService.getBlockDatesByRoomIdAndQuantity(req);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}
