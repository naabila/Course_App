import { Schema, model, Document } from 'mongoose';

interface ITopic extends Document {
  lessonId: string;
  title: string;
  content: string;
  quizzes: string[];
  createdAt: Date;
  updatedAt: Date;
}

const topicSchema = new Schema<ITopic>({
  lessonId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  quizzes: [{ type: String }],
}, { timestamps: true });

const Topic = model<ITopic>('Topic', topicSchema);

export { Topic, ITopic };