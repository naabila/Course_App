import { Lesson } from '../models/lesson.model';
import { Course } from '../models/course.model';
import { ILesson } from '../types/index';
import { NotFoundError } from '../utils/error.util';

class LessonService {
    async createLesson(courseId: string, lessonData: ILesson) {
        const lesson = new Lesson(lessonData);
        await lesson.save();
        await Course.findByIdAndUpdate(courseId, { $push: { lessons: lesson._id } });
        return lesson;
    }

    async updateLesson(lessonId: string, lessonData: Partial<ILesson>) {
        const lesson = await Lesson.findByIdAndUpdate(lessonId, lessonData, { new: true });
        if (!lesson) throw new NotFoundError('Lesson not found');
        return lesson;
    }

    async deleteLesson(lessonId: string) {
        const lesson = await Lesson.findByIdAndDelete(lessonId);
        if (!lesson) throw new NotFoundError('Lesson not found');
        return lesson;
    }

    async getLessonsByCourse(courseId: string) {
        const course = await Course.findById(courseId).populate('lessons');
        if (!course) throw new NotFoundError('Course not found');
        return course.lessons;
    }
}

export const lessonService = new LessonService();