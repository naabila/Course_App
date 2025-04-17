import { Schema, model, Document } from 'mongoose';

interface ILesson extends Document {
  title: string;
  description: string;
  courseId: string;
  topics: string[];
  quizzes: string[];
  createdAt: Date;
  updatedAt: Date;
}

const lessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  courseId: { type: String, required: true },
  topics: [{ type: String }],
  quizzes: [{ type: String }],
}, { timestamps: true });

const Lesson = model<ILesson>('Lesson', lessonSchema);

export { Lesson, ILesson };