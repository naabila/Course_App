import { Router } from 'express';
import { registerUser, getUser, updateUserDetails, deleteUserAccount, follow, unfollow, enrollInCourse, likeCourse, getFollowers, getStudentProgress, markLessonComplete, markQuizComplete } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', registerUser);
router.get('/:id', authenticate, getUser);
router.put('/:id', authenticate, updateUserDetails);
router.delete('/:id', authenticate, deleteUserAccount);
router.post('/:userId/follow', authenticate, follow);
router.post('/:userId/unfollow', authenticate, unfollow);
router.post('/enroll', authenticate, enrollInCourse);
router.post('/like', authenticate, likeCourse);
router.get('/:teacherId/followers', authenticate, getFollowers);
router.get('/me/progress', authenticate, getStudentProgress);
router.post('/progress/lesson', authenticate, markLessonComplete);
router.post('/progress/quiz', authenticate, markQuizComplete);

export default router;