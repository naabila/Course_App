import { Router } from 'express';
import { createQuiz, updateQuiz, deleteQuiz, getQuizById, getQuizzesByLesson } from '../controllers/quiz.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';

const router = Router();

router.post('/', authenticate, authorizeRole(['teacher']), createQuiz);
router.put('/:id', authenticate, authorizeRole(['teacher']), updateQuiz);
router.delete('/:id', authenticate, authorizeRole(['teacher']), deleteQuiz);
router.get('/:id', authenticate, getQuizById);
router.get('/lesson/:lessonId', authenticate, getQuizzesByLesson);

export default router;