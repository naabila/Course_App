import { Schema, model, Document } from 'mongoose';

interface IQuiz extends Document {
  title: string;
  description: string;
  lessonId: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const quizSchema = new Schema<IQuiz>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  lessonId: { type: String, required: true },
  questions: [{
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true }
  }],
}, { timestamps: true });

const Quiz = model<IQuiz>('Quiz', quizSchema);

export default Quiz;