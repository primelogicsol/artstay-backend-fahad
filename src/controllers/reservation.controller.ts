import { reservationService } from "~/services/reservation.service";
import { Request, Response } from "express";

export const getReservationPreview = async (req: Request, res: Response) => {
    try {
        const { sellerId } = req.params
        const result = await reservationService.reservationPreview(sellerId)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const getReservationForTable = async (req: Request, res: Response) => {
    try {
        const result = await reservationService.getReservationTable(req.params.sellerId)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const getAllReservations = async (req: Request, res: Response) => {
    try {
        const result = await reservationService.getAllReservations(req.params.sellerId)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const createReservation = async (req: Request, res: Response) => {
    try {
        const result = await reservationService.makeBooking(req)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const getBookingWithDetailByBookingDetailId = async (req: Request, res: Response) => {
    try {
        const { bookingId,accountId } = req.body as { bookingId: string, accountId: string }
        const result = await reservationService.getBookingWithDetailByBookingDetailId(bookingId, accountId)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const updateReservation = async (req: Request, res: Response) => {
    try {
        const result = await reservationService.updateBooking(req)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}   

export const getAllBookingsWithDetailBySellerId = async (req: Request, res: Response) => {
    try {
        const result = await reservationService.getAllBookingsWithDetail(req.params.sellerId)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const cancelBooking = async (req: Request, res: Response) => {
    try {
        const result = await reservationService.cancelBooking(req)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}

export const refundBooking = (req: Request, res: Response) => {
    try {
        // const result = await reservationService.makeRefund(req)
        res.status(200).json({data:null,message:'success',status:'success'})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}
