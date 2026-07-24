import Announcement from '../models/Announcement.js';

export const getAnnouncementsQuery = async (queryStruct = {}) => {
    const { active, limit = 10 } = queryStruct;
    
    const query = {};
    if (active !== undefined) {
        query.active = active === 'true' || active === true;
    }

    const announcements = await Announcement.find(query)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit))
        .populate('createdBy', 'name email');

    return announcements;
};

export const getAnnouncementById = async (id) => {
    return await Announcement.findById(id).populate('createdBy', 'name email');
};

export const createAnnouncement = async (data, user) => {
    const announcement = new Announcement({
        ...data,
        createdBy: user._id
    });
    return await announcement.save();
};

export const updateAnnouncement = async (id, data) => {
    return await Announcement.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteAnnouncement = async (id) => {
    return await Announcement.findByIdAndDelete(id);
};
