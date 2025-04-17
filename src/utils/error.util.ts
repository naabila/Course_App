import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const response = {
        success: false,
        statusCode,
        message: err.message || 'Internal Server Error',
        error: err.details || {},
    };
    res.status(statusCode).json(response);
};