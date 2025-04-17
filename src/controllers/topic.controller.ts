import { Request, Response, NextFunction } from 'express';
import { topicService } from '../services/topic.service';
import { successResponse, errorResponse } from '../utils/response.util';
import { AuthenticatedRequest } from '../types';

export const createTopic = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { lessonId, title, content } = req.body;
    const topic = await topicService.createTopic(lessonId, { title, content });
    return successResponse(res, 201, 'Topic created successfully', topic);
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    return errorResponse(res, err.message || 'Error creating topic', err, 400);
  }
};

export const updateTopic = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { topicId } = req.params;
    const topic = await topicService.updateTopic(topicId, req.body);
    if (!topic) return errorResponse(res, 'Topic not found', {}, 404);
    return successResponse(res, 200, 'Topic updated successfully', topic);
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    return errorResponse(res, err.message || 'Error updating topic', err, 400);
  }
};

export const deleteTopic = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { topicId } = req.params;
    const topic = await topicService.deleteTopic(topicId);
    if (!topic) return errorResponse(res, 'Topic not found', {}, 404);
    return successResponse(res, 200, 'Topic deleted successfully', topic);
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    return errorResponse(res, err.message || 'Error deleting topic', err, 400);
  }
};

export const getTopicsByLesson = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { lessonId } = req.params;
    const topics = await topicService.getTopicsByLesson(lessonId);
    return successResponse(res, 200, 'Topics retrieved successfully', topics);
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    return errorResponse(res, err.message || 'Error retrieving topics', err, 400);
  }
};

export const getTopicById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { topicId } = req.params;
    const topic = await topicService.getTopicById(topicId);
    if (!topic) return errorResponse(res, 'Topic not found', {}, 404);
    return successResponse(res, 200, 'Topic retrieved successfully', topic);
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    return errorResponse(res, err.message || 'Error retrieving topic', err, 400);
  }
};
