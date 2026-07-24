import { loginUser } from '../services/authService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// @desc    Auth user & get token
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await loginUser(email, password);

        if (!userData) {
            return errorResponse(res, 401, 'Invalid email or password');
        }

        return successResponse(res, 200, 'Login successful', userData);
    } catch (error) {
        console.error('Login error:', error);
        return errorResponse(res, 500, 'Server error during login');
    }
};

// @desc    Get user profile (current user)
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        // req.user is set in protect middleware
        if (!req.user) {
            return errorResponse(res, 404, 'User not found');
        }
        return successResponse(res, 200, 'Profile fetched successfully', {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
        });
    } catch (error) {
        return errorResponse(res, 500, 'Server error');
    }
};
