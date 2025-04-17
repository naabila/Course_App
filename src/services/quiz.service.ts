import Quiz from '../models/quiz.model';

class QuizService {
    async createQuiz(data: any) {
        const quiz = new Quiz(data);
        return await quiz.save();
    }
    async updateQuiz(id: string, data: any) {
        return await Quiz.findByIdAndUpdate(id, data, { new: true });
    }
    async deleteQuiz(id: string) {
        return await Quiz.findByIdAndDelete(id);
    }
    async getQuizById(id: string) {
        return await Quiz.findById(id);
    }
    async getQuizzesByLesson(lessonId: string) {
        return await Quiz.find({ lessonId });
    }
    async getQuizzes() {
        return await Quiz.find();
    }
}

export const quizService = new QuizService();