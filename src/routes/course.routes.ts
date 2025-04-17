import { Router } from 'express';
import { 
    createCourse, 
    updateCourse, 
    deleteCourse, 
    getCourses, 
    getCourseById,
    getCourseAnalytics
} from '../controllers/course.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';

const router = Router();

router.post('/', authenticate, authorizeRole(['teacher']), createCourse);
router.put('/:id', authenticate, authorizeRole(['teacher']), updateCourse);
router.delete('/:id', authenticate, authorizeRole(['teacher']), deleteCourse);
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.get('/:id/analytics', authenticate, authorizeRole(['teacher']), getCourseAnalytics);

export default router;