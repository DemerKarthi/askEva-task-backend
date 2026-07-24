import Activity from '../models/Activity.js';

export const logActivity = async (data) => {
    try {
        // Non-blocking log, errors here should not crash the main transaction
        await Activity.create(data);
    } catch (error) {
        console.error('Failed to log activity:', error);
    }
};

export const getActivitiesQuery = async (queryStruct = {}) => {
    const limit = parseInt(queryStruct.limit) || 10;
    
    // Sort latest first
    const activities = await Activity.find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('performedBy', 'name email');

    return activities;
};
