import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let errorMessage = '';
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
        errorMessage = err.message;
    } else if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Cast Error';
        errorMessage = err.message;
    } else if (err.code === 11000) {
        statusCode = 409;
        message = 'Duplicate Entry';
        errorMessage = 'Duplicate field value entered';
    } else {
        errorMessage = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};