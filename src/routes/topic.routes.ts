import { Router } from 'express';
import { createTopic, updateTopic, deleteTopic, getTopicsByLesson, getTopicById } from '../controllers/topic.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';

const router = Router();

router.post('/', authenticate, authorizeRole(['teacher']), createTopic);
router.put('/:topicId', authenticate, authorizeRole(['teacher']), updateTopic);
router.delete('/:topicId', authenticate, authorizeRole(['teacher']), deleteTopic);
router.get('/lesson/:lessonId', authenticate, getTopicsByLesson);
router.get('/:topicId', authenticate, getTopicById);

export default router;
