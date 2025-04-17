import { Course } from '../models/course.model';
import { User } from '../models/user.model';
import { ICourse, ICourseInput } from '../types';
import { ErrorHandler } from '../utils/error.util';

class CourseService {
    async createCourse(courseData: ICourseInput, userId: string): Promise<ICourse> {
        const course = new Course({ ...courseData, teacher: userId });
        await course.save();
        return course;
    }

    async updateCourse(courseId: string, courseData: Partial<ICourseInput>): Promise<ICourse | null> {
        const course = await Course.findByIdAndUpdate(courseId, courseData, { new: true });
        if (!course) throw new ErrorHandler(404, 'Course not found');
        return course;
    }

    async deleteCourse(courseId: string): Promise<ICourse | null> {
        const course = await Course.findByIdAndDelete(courseId);
        if (!course) throw new ErrorHandler(404, 'Course not found');
        return course;
    }

    async getCourses(page: number, limit: number, searchTerm: string): Promise<{ courses: ICourse[], total: number }> {
        const query = searchTerm ? { title: { $regex: searchTerm, $options: 'i' } } : {};
        const total = await Course.countDocuments(query);
        const courses = await Course.find(query).skip((page - 1) * limit).limit(limit);
        return { courses, total };
    }

    async getCourseAnalytics(courseId: string): Promise<any> {
        const course = await Course.findById(courseId).populate('students');
        if (!course) throw new ErrorHandler(404, 'Course not found');
        return {
            enrolledStudents: course.students.length,
            feedback: course.feedback,
            likes: course.likes
        };
    }
}

export const courseService = new CourseService();