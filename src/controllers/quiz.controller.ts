import { Request, Response, NextFunction } from 'express';
import { quizService } from '../services/quiz.service';
import { successResponse } from '../utils/response.util';

export const createQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quiz = await quizService.createQuiz(req.body);
        return successResponse(res, 201, 'Quiz created successfully', quiz);
    } catch (err) {
        next(err);
    }
};

export const updateQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quiz = await quizService.updateQuiz(req.params.id, req.body);
        if (!quiz) throw { statusCode: 404, message: 'Quiz not found' };
        return successResponse(res, 200, 'Quiz updated successfully', quiz);
    } catch (err) {
        next(err);
    }
};

export const deleteQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quiz = await quizService.deleteQuiz(req.params.id);
        if (!quiz) throw { statusCode: 404, message: 'Quiz not found' };
        return successResponse(res, 200, 'Quiz deleted successfully');
    } catch (err) {
        next(err);
    }
};

export const getQuizzes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quizzes = await quizService.getQuizzes();
        return successResponse(res, 200, 'Quizzes retrieved successfully', quizzes);
    } catch (err) {
        next(err);
    }
};

export const getQuizById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quiz = await quizService.getQuizById(req.params.id);
        if (!quiz) throw { statusCode: 404, message: 'Quiz not found' };
        return successResponse(res, 200, 'Quiz retrieved successfully', quiz);
    } catch (err) {
        next(err);
    }
};

export const getQuizzesByLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quizzes = await quizService.getQuizzesByLesson(req.params.lessonId);
        return successResponse(res, 200, 'Quizzes retrieved successfully', quizzes);
    } catch (err) {
        next(err);
    }
};