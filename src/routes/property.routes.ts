import { Router } from "express";
import {
  createRoom,
  getAllHotels,
  getAllRoomsByAccountId,
  getAllRoomsByHotelId,
  getAllRoomsForBooking,
  getHotelByAccountId,
  getRoomByRoomId,
  hotelApplicationtatus,
  updateHotel,
  updateRoomStatus,
} from "~/controllers/property.controller";
import { validate } from "~/middlewares/zod.middleware";
import { PropertyUpdateSchema } from "~/schemas/hotel";

const router = Router();

router.get('/all',getAllHotels)
router.get("/application-status/:accountId", hotelApplicationtatus);
router.get("/rooms/:accountId", getAllRoomsByAccountId);
router.get("/rooms-hotel/:hotelId", getAllRoomsByHotelId);
router.get('/room/:roomId',getRoomByRoomId)
router.get("/hotels/:accountId", getHotelByAccountId);
router.get("/seller/:sellerId", getAllRoomsForBooking);
router.post('/create-room',createRoom)

router.put('/room-status',updateRoomStatus)
router.put("/", validate(PropertyUpdateSchema), updateHotel);

export const propertyRouter = router;