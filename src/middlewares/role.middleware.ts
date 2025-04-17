import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';

export const authorizeRole = (roles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({
                success: false,
                statusCode: 403,
                message: 'Access denied. Insufficient permissions.',
                errorMessage: 'Forbidden'
            });
        }
        next();
    };
};