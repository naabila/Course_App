import { Request, Response, NextFunction } from 'express';
import { Feedback, IFeedback } from '../models/feedback.model';
import { Course } from '../models/course.model';
import { successResponse, errorResponse } from '../utils/response.util';
import { AuthenticatedRequest } from '../types';

export const createFeedback = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { courseId, comment, rating } = req.body;
        const userId = req.user?._id;
        const feedback = new Feedback({ courseId, userId, comment, rating, likes: [] });
        await feedback.save();
        await Course.findByIdAndUpdate(courseId, { $push: { feedback: feedback._id } });
        return successResponse(res, 201, 'Feedback created successfully', feedback);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error creating feedback', err, 400);
    }
};

export const getFeedbackByCourse = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { courseId } = req.params;
        const feedbacks = await Feedback.find({ courseId });
        return successResponse(res, 200, 'Feedback retrieved successfully', feedbacks);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error retrieving feedback', err, 400);
    }
};

export const deleteFeedback = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { feedbackId } = req.params;
        const feedback = await Feedback.findById(feedbackId);
        if (!feedback) return errorResponse(res, 'Feedback not found', {}, 404);
        if (feedback.userId !== req.user?._id) return errorResponse(res, 'Unauthorized', {}, 403);
        await Feedback.findByIdAndDelete(feedbackId);
        await Course.findByIdAndUpdate(feedback.courseId, { $pull: { feedback: feedbackId } });
        return successResponse(res, 200, 'Feedback deleted successfully');
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error deleting feedback', err, 400);
    }
};