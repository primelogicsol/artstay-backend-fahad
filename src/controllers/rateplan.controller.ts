import { ratePlanService } from "~/services/rateplan.service";
import { Request, Response } from "express";


export const getRatePlan = async (req: Request, res: Response) => {
    try {
        const result = await ratePlanService.getRatePlansById(req.params.rateId)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const getRoomRatePlansByRoomId = async (req: Request, res: Response) => {
    try {
        const result = await ratePlanService.getRoomRatePlanByRoomId(req.params.roomId)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const createRatePlan = async (req: Request, res: Response) => {
    try {
        const result = await ratePlanService.createRatePlan(req)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}   

export const updateRatePlan = async (req: Request, res: Response) => {
    try {
        const result = await ratePlanService.updateRatePlan(req)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const deleteRatePlan = async (req: Request, res: Response) => {
    try {
        const result = await ratePlanService.deleteRatePlan(req)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}   


export const getRoomRateByRoomId = async (req: Request, res: Response) => {
    try {
        const result = await ratePlanService.getRoomRateByRoomId(req.params.roomId)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const getRatePlanBySellerId = async (req: Request, res: Response) => {
    try {
        const result = await ratePlanService.getRatePlanBySellerId(req.params.sellerId)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const toggleRateStatus = async (req: Request, res: Response) => {
    try {
        const result = await ratePlanService.toggleRateStatus(req)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const getAllAssignedRoomsByRateId = async (req: Request, res: Response) => {
    try {
        const result = await ratePlanService.getAllAssignedRoomsByRateId(req.params.rateId)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const getAllRoomsByRateId = async (req: Request, res: Response) => {
    try {
        const result = await ratePlanService.getAllRoomsByRateId(req.params.sellerId)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const createRoomRatePlan = async (req: Request, res: Response) => {
    try {
        const result = await ratePlanService.createRoomRatePlan(req.body)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const deleteRoomRatePlan = async (req: Request, res: Response) => {
    try {
        const result = await ratePlanService.deleteRoomRatePlan(req)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}
