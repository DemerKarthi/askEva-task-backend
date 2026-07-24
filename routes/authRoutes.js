import express from 'express';
import { login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { check } from 'express-validator';
import { validateRequest } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
        validateRequest
    ],
    login
);

router.get('/me', protect, getMe);

export default router;
