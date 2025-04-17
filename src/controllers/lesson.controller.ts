import { Request, Response, NextFunction } from 'express';
import { Lesson, ILesson } from '../models/lesson.model';
import { Course } from '../models/course.model';
import { successResponse, errorResponse } from '../utils/response.util';
import { AuthenticatedRequest } from '../types';

export const createLesson = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { title, description, courseId } = req.body;
        const lesson = new Lesson({ title, description, courseId, topics: [], quizzes: [] });
        await lesson.save();
        await Course.findByIdAndUpdate(courseId, { $push: { lessons: lesson._id } });
        successResponse(res, 201, 'Lesson created successfully', lesson);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error creating lesson', err, 400);
    }
};

export const updateLesson = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { lessonId } = req.params;
        const updatedLesson = await Lesson.findByIdAndUpdate(lessonId, req.body, { new: true });
        if (!updatedLesson) {
            return errorResponse(res, 'Lesson not found', {}, 404);
        }
        successResponse(res, 200, 'Lesson updated successfully', updatedLesson);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error updating lesson', err, 400);
    }
};

export const deleteLesson = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { lessonId } = req.params;
        const lesson = await Lesson.findByIdAndDelete(lessonId);
        if (!lesson) {
            return errorResponse(res, 'Lesson not found', {}, 404);
        }
        await Course.findByIdAndUpdate(lesson.courseId, { $pull: { lessons: lessonId } });
        successResponse(res, 200, 'Lesson deleted successfully', lesson);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error deleting lesson', err, 400);
    }
};

export const getLessonsByCourse = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { courseId } = req.params;
        const lessons = await Lesson.find({ courseId });
        successResponse(res, 200, 'Lessons retrieved successfully', lessons);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error retrieving lessons', err, 400);
    }
};