import { Router } from 'express';
import { createFeedback, getFeedbackByCourse, deleteFeedback } from '../controllers/feedback.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, createFeedback);
router.get('/:courseId', authenticate, getFeedbackByCourse);
router.delete('/:feedbackId', authenticate, deleteFeedback);

export default router;