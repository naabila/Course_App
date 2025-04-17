import express from 'express';
import { errorHandler } from './middlewares/error.middleware';
import courseRoutes from './routes/course.routes';
import lessonRoutes from './routes/lesson.routes';
import quizRoutes from './routes/quiz.routes';
import feedbackRoutes from './routes/feedback.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import topicRoutes from './routes/topic.routes';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    statusCode: 200,
    message: 'Course Learning App API is running.',
    data: {}
  });
});

app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/lesson', lessonRoutes);
app.use('/api/v1/quiz', quizRoutes);
app.use('/api/v1/feedback', feedbackRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/topic', topicRoutes);

app.use(errorHandler);

export default app;