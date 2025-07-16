import { Router } from "express";
import {
  createFairEvent,
  fairApplicationStatus,
  createFairBooking,
  fairDetailById,
  fairProfileByAccountId,
  getAllFairs,
  getAllFairsPagination,
  getEventById,
  getFairEvents,
  updateFairEvent,
  toggleFairStatus,
  getAllFairBookings,
} from "~/controllers/fair.controller";
import { validate } from "~/middlewares/zod.middleware";
import { FairEventSchema, UpdateFairEventSchema } from "~/schemas/fair";

const router = Router();

router.get("/detail/:accountId", fairProfileByAccountId);
router.get("/events/:accountId", getFairEvents);
router.get("/event/:eventId", getEventById);
router.get("/all", getAllFairs);
router.get("/pagination", getAllFairsPagination);
router.get("/application-status/:accountId", fairApplicationStatus);
router.get('/bookings/:accountId', getAllFairBookings);
router.get("/:fairId", fairDetailById);

router.put("/toggle-status",toggleFairStatus);
router.post('/create-booking',createFairBooking)
router.post("/event", validate(FairEventSchema), createFairEvent);
router.patch("/event", validate(UpdateFairEventSchema), updateFairEvent);

export const fairRouter = router;
