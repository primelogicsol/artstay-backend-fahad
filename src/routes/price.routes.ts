import { getBlockDatesbySellerId, getAllPricesBySellerId, createPrice, getPriceByRoomRateId, createBlockDates, getBlockDatesByRoomId, getBlockByRoomIdAndQuantity,  } from "~/controllers/price.controller";
import { Router } from "express";

const router = Router();

router.get('/block/:sellerId',getBlockDatesbySellerId)
router.get('/roomrate/:rrpId',getPriceByRoomRateId)
router.get('/block-room/:roomId',getBlockDatesByRoomId)
router.get('/:sellerId',getAllPricesBySellerId)

router.post('/',createPrice)
router.post('/block',createBlockDates)
router.post('/block-booking',getBlockByRoomIdAndQuantity)

export const priceRouter = router;  
