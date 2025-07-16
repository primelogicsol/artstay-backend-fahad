import { Router } from 'express';
import { createCraft, createSubCraft, getAllCrafts, getAllSubCraftsByCraftId, updateCraft, updateSubCraft } from '~/controllers/craft.controller';
import { validate } from '~/middlewares/zod.middleware';
import { CraftCreationSchema, CraftUpdateSchema, SubCraftCreationSchema, SubCraftUpdateSchema } from '~/schemas/craft';

const router = Router();

router.get('/',getAllCrafts)
router.get('/sub-craft/:craftId',getAllSubCraftsByCraftId)
router.post('/',validate(CraftCreationSchema),createCraft)
router.put('/',validate(CraftUpdateSchema),updateCraft)
router.post('/sub-craft',validate(SubCraftCreationSchema),createSubCraft)
router.put('/sub-craft',validate(SubCraftUpdateSchema),updateSubCraft)

export const craftRouter = router;