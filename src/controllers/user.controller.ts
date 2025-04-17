import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';
import { successResponse, errorResponse } from '../utils/response.util';
import { AuthenticatedRequest } from '../types';
import { Course } from '../models/course.model';
import { User } from '../models/user.model';

export const registerUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const user = await userService.createUser(req.body);
        return successResponse(res, 201, 'User created successfully', user);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error creating user', err, 400);
    }
};

export const getUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const user = await userService.findUserById(req.params.id);
        if (!user) return errorResponse(res, 'User not found', {}, 404);
        return successResponse(res, 200, 'User retrieved successfully', user);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error retrieving user', err, 400);
    }
};

export const updateUserDetails = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (!user) return errorResponse(res, 'User not found', {}, 404);
        return successResponse(res, 200, 'User updated successfully', user);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error updating user', err, 400);
    }
};

export const deleteUserAccount = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        await userService.deleteUser(req.params.id);
        return successResponse(res, 204, 'User deleted successfully');
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error deleting user', err, 400);
    }
};

export const follow = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const result = await userService.followTeacher(req.params.userId, req.body.teacherId);
        return successResponse(res, 200, 'Following teacher successfully', result);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error following teacher', err, 400);
    }
};

export const unfollow = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const result = await userService.unfollowTeacher(req.params.userId, req.body.teacherId);
        return successResponse(res, 200, 'Unfollowed teacher successfully', result);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error unfollowing teacher', err, 400);
    }
};

export const enrollInCourse = async (req: AuthenticatedRequest, res: any) => {
    try {
        const userId = req.user?._id;
        if (!userId) return errorResponse(res, 'User not authenticated', {}, 401);
        const userIdStr = userId.toString();
        const { courseId } = req.body;
        const course = await Course.findById(courseId);
        if (!course) return errorResponse(res, 'Course not found', {}, 404);
        if (!course.enrolledStudents.includes(userIdStr)) {
            course.enrolledStudents.push(userIdStr);
            await course.save();
        }
        await User.findByIdAndUpdate(userIdStr, { $addToSet: { coursesEnrolled: courseId } });
        return successResponse(res, 200, 'Enrolled in course successfully', course);
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error enrolling in course', err, 400);
    }
};

export const likeCourse = async (req: AuthenticatedRequest, res: any) => {
    try {
        const userId = req.user?._id;
        if (!userId) return errorResponse(res, 'User not authenticated', {}, 401);
        const userIdStr = userId.toString();
        const { courseId } = req.body;
        const course = await Course.findById(courseId);
        if (!course) return errorResponse(res, 'Course not found', {}, 404);
        if (!course.likes) course.likes = 0;
        course.likes += 1;
        await course.save();
        return successResponse(res, 200, 'Course liked successfully', { likes: course.likes });
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error liking course', err, 400);
    }
};

export const getFollowers = async (req: AuthenticatedRequest, res: any) => {
    try {
        const teacherId = req.params.teacherId;
        const teacher = await User.findById(teacherId);
        if (!teacher || teacher.role !== 'teacher') return errorResponse(res, 'Teacher not found', {}, 404);
        return successResponse(res, 200, 'Followers retrieved successfully', { followers: teacher.followers });
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error retrieving followers', err, 400);
    }
};

export const getStudentProgress = async (req: AuthenticatedRequest, res: any) => {
    try {
        const userId = req.user?._id;
        const user = await User.findById(userId);
        if (!user) return errorResponse(res, 'User not found', {}, 404);
        return successResponse(res, 200, 'Progress retrieved successfully', { progress: user.progress });
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error retrieving progress', err, 400);
    }
};

export const markLessonComplete = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) return errorResponse(res, 'User not authenticated', {}, 401);
        const userIdStr = userId.toString();
        const { courseId, lessonId } = req.body;
        const user = await User.findById(userIdStr);
        if (!user) return errorResponse(res, 'User not found', {}, 404);
        let courseProgress = user.progress.find(p => p.courseId === courseId);
        if (!courseProgress) {
            courseProgress = { courseId, completedLessons: [], completedQuizzes: [] };
            user.progress.push(courseProgress);
        }
        if (!courseProgress.completedLessons.includes(lessonId)) {
            courseProgress.completedLessons.push(lessonId);
        }
        await user.save();
        return successResponse(res, 200, 'Lesson marked as complete', { progress: user.progress });
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error marking lesson complete', err, 400);
    }
};

export const markQuizComplete = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) return errorResponse(res, 'User not authenticated', {}, 401);
        const userIdStr = userId.toString();
        const { courseId, quizId } = req.body;
        const user = await User.findById(userIdStr);
        if (!user) return errorResponse(res, 'User not found', {}, 404);
        let courseProgress = user.progress.find(p => p.courseId === courseId);
        if (!courseProgress) {
            courseProgress = { courseId, completedLessons: [], completedQuizzes: [] };
            user.progress.push(courseProgress);
        }
        if (!courseProgress.completedQuizzes.includes(quizId)) {
            courseProgress.completedQuizzes.push(quizId);
        }
        await user.save();
        return successResponse(res, 200, 'Quiz marked as complete', { progress: user.progress });
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        return errorResponse(res, err.message || 'Error marking quiz complete', err, 400);
    }
};
