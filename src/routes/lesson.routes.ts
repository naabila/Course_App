import { Router } from 'express';
import { createLesson, updateLesson, deleteLesson, getLessonsByCourse } from '../controllers/lesson.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';

const router = Router();

router.post('/', authenticate, authorizeRole(['teacher']), createLesson);
router.put('/:lessonId', authenticate, authorizeRole(['teacher']), updateLesson);
router.delete('/:lessonId', authenticate, authorizeRole(['teacher']), deleteLesson);
router.get('/course/:courseId', authenticate, getLessonsByCourse);

export default router;