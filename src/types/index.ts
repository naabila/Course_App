import { Request } from 'express';
import { Types } from 'mongoose';

export interface IUser {
  _id?: string | Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher';
  followers: string[];
  coursesEnrolled: string[];
  progress: {
    courseId: string;
    completedLessons: string[];
    completedQuizzes: string[];
  }[];
}

export interface ICourse {
  _id: string;
  title: string;
  description: string;
  teacherId: string;
  lessons: string[];
  enrolledStudents: string[];
  feedback: string[];
  likes: number;
}

export interface ILesson {
  _id: string;
  title: string;
  description: string;
  courseId: string;
  topics: string[];
  quizzes: string[];
}

export interface ITopic {
  _id: string;
  lessonId: string;
  title: string;
  content: string;
  quizzes: string[];
}

export interface IQuiz {
  _id: string;
  title: string;
  description: string;
  lessonId: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
}

export interface IFeedback {
  _id: string;
  courseId: string;
  userId: string;
  comment: string;
  rating: number;
  likes: string[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}