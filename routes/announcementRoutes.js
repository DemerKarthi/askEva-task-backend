import express from 'express';
import {
    getAnnouncements,
    getAnnouncement,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
} from '../controllers/announcementController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // Protect all announcement routes

router.route('/')
    .get(getAnnouncements)
    .post(createAnnouncement);

router.route('/:id')
    .get(getAnnouncement)
    .put(updateAnnouncement)
    .delete(deleteAnnouncement);

export default router;
