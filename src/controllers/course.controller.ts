import { Request, Response, NextFunction } from 'express';
import { Course, ICourse } from '../models/course.model';
import { successResponse, errorResponse } from '../utils/response.util';
import { AuthenticatedRequest } from '../types';

export const createCourse = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { title, description } = req.body;
        const teacherId = req.user?._id;
        const course = new Course({ title, description, teacherId, lessons: [], enrolledStudents: [], feedback: [], likes: 0 });
        await course.save();
        return successResponse(res, 201, 'Course created successfully', course);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error creating course', err, 400);
    }
};

export const updateCourse = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const course = await Course.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!course) {
            return errorResponse(res, 'Course not found', {}, 404);
        }
        return successResponse(res, 200, 'Course updated successfully', course);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error updating course', err, 400);
    }
};

export const deleteCourse = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            return errorResponse(res, 'Course not found', {}, 404);
        }
        return successResponse(res, 200, 'Course deleted successfully', course);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error deleting course', err, 400);
    }
};

export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt((req.query.page as string) || '1', 10);
        const limit = parseInt((req.query.limit as string) || '10', 10);
        const searchTerm = typeof req.query.searchTerm === 'string' ? req.query.searchTerm : '';
        const filter: any = {};
        if (searchTerm) {
            filter.$or = [
                { title: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ];
        }
        const courses = await Course.find(filter)
            .skip((page - 1) * limit)
            .limit(limit);
        const total = await Course.countDocuments(filter);
        return successResponse(res, 200, 'Courses fetched successfully', {
            courses,
            total,
            page,
            limit
        });
    } catch (err) {
        next(err);
    }
};

export const getCourseById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) {
            return errorResponse(res, 'Course not found', {}, 404);
        }
        return successResponse(res, 200, 'Course retrieved successfully', course);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error retrieving course', err, 400);
    }
};

export const getCourseAnalytics = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return errorResponse(res, 'Course not found', {}, 404);
        const analytics = {
            enrolledStudents: course.enrolledStudents.length,
            likes: course.likes,
            feedbackCount: course.feedback.length,
            feedback: course.feedback
        };
        return successResponse(res, 200, 'Course analytics retrieved successfully', analytics);
    } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        return errorResponse(res, error.message || 'Error retrieving analytics', error, 400);
    }
};