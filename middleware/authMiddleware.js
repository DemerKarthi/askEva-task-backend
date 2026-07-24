import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/apiResponse.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.id).select('-password');
            if(!req.user) {
                return errorResponse(res, 401, 'Not authorized, user not found');
            }
            next();
        } catch (error) {
            console.error(error);
            return errorResponse(res, 401, 'Not authorized, token failed');
        }
    }

    if (!token) {
        return errorResponse(res, 401, 'Not authorized, no token');
    }
};

export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        return errorResponse(res, 403, 'Not authorized as an admin');
    }
};
