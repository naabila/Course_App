import { Response } from 'express';

export const successResponse = (res: Response, statusCode: number = 200, message: string = 'Operation successful', data: any = {}) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data
  });
};

export const errorResponse = (res: Response, message: string, error: any = {}, statusCode: number = 400) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error
  });
};