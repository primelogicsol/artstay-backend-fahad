import { Router } from 'express';
import { createArtisanPackage, getArtisanPackages, getPackageById, updateArtisanPackage } from '~/controllers/package.controller';
import { validate } from '~/middlewares/zod.middleware';
import { artisanPackageCreationSchema, artisanPackageUpdationSchema } from '~/schemas/package';

const router = Router();


router.get('/artisan/:accountId',getArtisanPackages)
router.get('/:packageId',getPackageById)

router.patch('/artisan',validate(artisanPackageUpdationSchema),updateArtisanPackage)
router.post('/artisan',validate(artisanPackageCreationSchema),createArtisanPackage)


export const packageRouter = router;