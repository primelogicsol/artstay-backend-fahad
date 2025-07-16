import { createRatePlan, createRoomRatePlan, deleteRatePlan, deleteRoomRatePlan, getAllAssignedRoomsByRateId, getAllRoomsByRateId, getRatePlan, getRatePlanBySellerId, getRoomRateByRoomId, getRoomRatePlansByRoomId, toggleRateStatus, updateRatePlan } from "~/controllers/rateplan.controller";
import { Router } from "express";

const router = Router();

router.get('/room-rate/:roomId',getRoomRateByRoomId)
router.get('/rateplan/:rateId',getRatePlan)
router.get('/:sellerId',getRatePlanBySellerId)
router.get('/room/:roomId',getRoomRatePlansByRoomId)
router.get('/assigned-rooms/:rateId',getAllAssignedRoomsByRateId)
router.get('/rooms/:sellerId',getAllRoomsByRateId)

router.post('/',createRatePlan)
router.put('/',updateRatePlan)
router.delete('/',deleteRatePlan)
router.put('/status',toggleRateStatus)
router.post('/room',createRoomRatePlan)
router.delete('/room',deleteRoomRatePlan)

export const rateplanRouter = router;