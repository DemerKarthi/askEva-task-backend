import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        return null;
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return null;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
    };
};
