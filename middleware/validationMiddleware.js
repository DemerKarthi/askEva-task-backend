import { validationResult } from 'express-validator';
import { errorResponse } from '../utils/apiResponse.js';

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = {};
        errors.array().forEach(err => {
            extractedErrors[err.path] = err.msg;
        });
        return errorResponse(res, 400, 'Validation Error', extractedErrors);
    }
    next();
};
