import { Router } from 'express';
import {
  createEcoTransit,
  getEcoTransitDetail,
  createEcoTransitOption,
  getEcoTransitOptions,
  createEcoTransitBooking,
  getEcoTransitBookings,
  getAllEcoTransits,
  getApplicationStatus,
} from '~/controllers/eco-transit.controller';

const router = Router();

router.post('/', createEcoTransit);
router.get('/:transitId', getEcoTransitDetail);
router.post('/option', createEcoTransitOption);
router.get('/options/:transitId', getEcoTransitOptions);
router.post('/booking', createEcoTransitBooking);
router.get('/bookings/:transitId', getEcoTransitBookings);
router.get('/all', getAllEcoTransits);
router.get('/application-status/:accountId', getApplicationStatus);

export const ecoTransitRouter = router; 