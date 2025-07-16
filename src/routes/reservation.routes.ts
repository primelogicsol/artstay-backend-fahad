import { cancelBooking, createReservation, getAllBookingsWithDetailBySellerId, getAllReservations, getBookingWithDetailByBookingDetailId, getReservationForTable, getReservationPreview, refundBooking, updateReservation } from "~/controllers/reservation.controller";
import { Router } from "express";


const router = Router();


router.get('/all/:sellerId', getAllBookingsWithDetailBySellerId)
router.get("/:sellerId", getAllReservations)
router.get('/preview/:sellerId', getReservationPreview)
router.get('/seller-all/:sellerId', getReservationForTable)

router.post('/detail', getBookingWithDetailByBookingDetailId)
router.post('/create', createReservation)
router.patch('/', updateReservation)
router.post('/cancel', cancelBooking)
router.post('/refund', refundBooking)

export const reservationRouter = router;
