export const successResponse = (res, statusCode, message, data = {}, pagination = null) => {
    const response = {
        success: true,
        message,
        data,
    };
    
    if (pagination) {
        response.pagination = pagination;
    }
    
    return res.status(statusCode).json(response);
};

export const errorResponse = (res, statusCode, message, errors = null) => {
    const response = {
        success: false,
        message,
    };

    if (errors) {
        response.errors = errors;
    }

    return res.status(statusCode).json(response);
};
