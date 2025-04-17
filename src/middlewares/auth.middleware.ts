import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { AuthenticatedRequest } from '../types';

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: 'No token provided',
            errorMessage: 'Authentication required'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'User not found',
                errorMessage: 'Invalid token'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: 'Unauthorized',
            errorMessage: 'Invalid token'
        });
    }
};

export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'All fields (name, email, password, role) are required',
        });
    }
    next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Email and password are required',
        });
    }
    next();
};