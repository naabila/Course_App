import { Schema, model, Document } from 'mongoose';

interface IFeedback extends Document {
  courseId: string;
  userId: string;
  rating: number;
  comment: string;
  likes: string[];
  createdAt: Date;
}

const feedbackSchema = new Schema<IFeedback>({
  courseId: { type: String, required: true },
  userId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  likes: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const Feedback = model<IFeedback>('Feedback', feedbackSchema);

export { Feedback, IFeedback };