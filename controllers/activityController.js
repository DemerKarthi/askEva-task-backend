import * as activityService from '../services/activityService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// @desc    Get all activities (dashboard timeline)
// @route   GET /api/v1/activities
// @access  Private
export const getActivities = async (req, res) => {
    try {
        const activities = await activityService.getActivitiesQuery(req.query);
        return successResponse(res, 200, 'Activities retrieved successfully', activities);
    } catch (error) {
        return errorResponse(res, 500, 'Server error retrieving activities', error.message);
    }
};
