import { Feedback } from '../models/feedback.model';
import { Course } from '../models/course.model';
import { User } from '../models/user.model';

class FeedbackService {
    async createFeedback(courseId: string, userId: string, feedbackData: { comment: string; rating: number }) {
        const feedback = new Feedback({ courseId, userId, ...feedbackData });
        await feedback.save();
        await Course.findByIdAndUpdate(courseId, { $inc: { feedbackCount: 1 } });
        return feedback;
    }

    async getFeedbackByCourse(courseId: string) {
        return await Feedback.find({ courseId }).populate('userId', 'name email');
    }

    async likeFeedback(feedbackId: string, userId: string) {
        const feedback = await Feedback.findById(feedbackId);
        if (!feedback.likes.includes(userId)) {
            feedback.likes.push(userId);
            await feedback.save();
        }
        return feedback;
    }

    async deleteFeedback(feedbackId: string, userId: string) {
        const feedback = await Feedback.findById(feedbackId);
        if (feedback.userId.toString() !== userId) {
            throw new Error('Unauthorized');
        }
        await Feedback.findByIdAndDelete(feedbackId);
        return { message: 'Feedback deleted successfully' };
    }
}

export const feedbackService = new FeedbackService();