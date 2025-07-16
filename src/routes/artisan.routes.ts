import { Router } from 'express';
import {  artisanApplicationStatus, artisanBooking, artisanDetailByAccountId, artisanDetailByArtisanId, getAllArtisanBookings, getAllArtisans, getAllArtisansPagination, getPortfolioByAccountId, getPortfolioByArtisanId, updateArtisanStatus, updatePortfolioArtisanId } from '~/controllers/artisan.controller';
import { validate } from '~/middlewares/zod.middleware';
import { artisanStatusUpdateSchema, artisanUpdatePortfolioSchema, createArtisanBookingSchema, } from '~/schemas/artisan';


const router = Router();

router.get('/pagination', getAllArtisansPagination)
router.get('/all', getAllArtisans)
router.get('/:artisanId', artisanDetailByArtisanId)
router.get('/detail/:accountId', artisanDetailByAccountId)
router.get('/application-status/:accountId', artisanApplicationStatus)
router.get('/account-portfolio/:accountId', getPortfolioByAccountId)
router.get('/artisan-portfolio/:artisanId', getPortfolioByArtisanId)
router.get('/bookings/:accountId', getAllArtisanBookings);

router.put('/toggle-status', updateArtisanStatus)
router.post('/status', validate(artisanStatusUpdateSchema), updatePortfolioArtisanId)
router.post('/portfolio', validate(artisanUpdatePortfolioSchema), updatePortfolioArtisanId)
router.post('/create-booking',validate(createArtisanBookingSchema),artisanBooking)
export const artisanRouter = router;