import * as announcementService from '../services/announcementService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// @desc    Get all announcements
// @route   GET /api/v1/announcements
// @access  Private
export const getAnnouncements = async (req, res) => {
    try {
        const announcements = await announcementService.getAnnouncementsQuery(req.query);
        return successResponse(res, 200, 'Announcements retrieved successfully', announcements);
    } catch (error) {
        return errorResponse(res, 500, 'Server error retrieving announcements', error.message);
    }
};

// @desc    Get single announcement
// @route   GET /api/v1/announcements/:id
// @access  Private
export const getAnnouncement = async (req, res) => {
    try {
        const announcement = await announcementService.getAnnouncementById(req.params.id);
        if (!announcement) {
            return errorResponse(res, 404, 'Announcement not found');
        }
        return successResponse(res, 200, 'Announcement retrieved successfully', announcement);
    } catch (error) {
        return errorResponse(res, 500, 'Server error retrieving announcement', error.message);
    }
};

// @desc    Create new announcement
// @route   POST /api/v1/announcements
// @access  Private
export const createAnnouncement = async (req, res) => {
    try {
        const announcement = await announcementService.createAnnouncement(req.body, req.user);
        return successResponse(res, 201, 'Announcement created successfully', announcement);
    } catch (error) {
        return errorResponse(res, 400, 'Error creating announcement', error.message);
    }
};

// @desc    Update announcement
// @route   PUT /api/v1/announcements/:id
// @access  Private
export const updateAnnouncement = async (req, res) => {
    try {
        const announcement = await announcementService.updateAnnouncement(req.params.id, req.body);
        if (!announcement) {
            return errorResponse(res, 404, 'Announcement not found');
        }
        return successResponse(res, 200, 'Announcement updated successfully', announcement);
    } catch (error) {
        return errorResponse(res, 400, 'Error updating announcement', error.message);
    }
};

// @desc    Delete announcement
// @route   DELETE /api/v1/announcements/:id
// @access  Private
export const deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await announcementService.deleteAnnouncement(req.params.id);
        if (!announcement) {
            return errorResponse(res, 404, 'Announcement not found');
        }
        return successResponse(res, 200, 'Announcement removed successfully', {});
    } catch (error) {
        return errorResponse(res, 500, 'Error deleting announcement', error.message);
    }
};
