import { Router } from 'express';
import { createAccount, loginAccount } from '~/controllers/auth.controller';
import { validate } from '~/middlewares/zod.middleware';
import { AccountCreationSchema, LoginSchema } from '~/schemas/account';

const router = Router();

router.post('/create',validate(AccountCreationSchema),createAccount);
router.post('/login',validate(LoginSchema),loginAccount);

export const accountRouter = router;