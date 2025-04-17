import { Schema, model, Document } from 'mongoose';

interface ICourse extends Document {
  title: string;
  description: string;
  teacherId: string;
  lessons: string[];
  enrolledStudents: string[];
  feedback: string[];
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  teacherId: { type: String, required: true },
  lessons: [{ type: String }],
  enrolledStudents: [{ type: String }],
  feedback: [{ type: String }],
  likes: { type: Number, default: 0 },
}, { timestamps: true });

const Course = model<ICourse>('Course', courseSchema);

export { Course, ICourse };