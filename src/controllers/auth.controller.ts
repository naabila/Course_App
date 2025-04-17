import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await registerUser(name, email, password, role);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'User created successfully',
            data: { user }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            statusCode: 400,
            message: (error as Error).message,
            error
        });
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await loginUser(email, password);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User logged in successfully',
            data: { user, token }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            statusCode: 400,
            message: (error as Error).message,
            error
        });
    }
};