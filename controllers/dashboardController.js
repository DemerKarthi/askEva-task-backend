import { getDashboardStats } from '../services/dashboardService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// @desc    Get dashboard stats
// @route   GET /api/v1/dashboard/stats
// @access  Private
export const getStats = async (req, res) => {
    try {
        const stats = await getDashboardStats();
        return successResponse(res, 200, 'Dashboard statistics retrieved successfully', stats);
    } catch (error) {
        return errorResponse(res, 500, 'Server error retrieving dashboard stats', error.message);
    }
};
