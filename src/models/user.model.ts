import { Schema, model, Document, Types } from 'mongoose';
import { IUser } from '../types';

interface IUserDocument extends Document {
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

const userSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], default: 'student' },
  followers: [{ type: String }],
  coursesEnrolled: [{ type: String }],
  progress: [{
    courseId: String,
    completedLessons: [String],
    completedQuizzes: [String]
  }]
}, { timestamps: true });

const User = model<IUserDocument>('User', userSchema);

export { User, IUserDocument };