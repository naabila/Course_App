import { User } from '../models/user.model';
import { IUser } from '../types';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

class UserService {
    async createUser({ name, email, password, role }: { name: string; email: string; password: string; role: 'student' | 'teacher' }): Promise<IUser> {
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role, followers: [], coursesEnrolled: [], progress: [] });
        return await user.save();
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword);
    }

    async generateToken(user: IUser): Promise<string> {
        return sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    }

    async getAllUsers(): Promise<IUser[]> {
        return await User.find();
    }

    async findUserById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }

    async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteUser(id: string): Promise<IUser | null> {
        return await User.findByIdAndDelete(id);
    }

    async followTeacher(studentId: string, teacherId: string) {
        const student = await User.findById(studentId);
        const teacher = await User.findById(teacherId);
        if (!student || !teacher || teacher.role !== 'teacher') throw new Error('Invalid teacher');
        if (!teacher.followers.includes(studentId)) {
            teacher.followers.push(studentId);
            await teacher.save();
        }
        return teacher;
    }

    async unfollowTeacher(studentId: string, teacherId: string) {
        const teacher = await User.findById(teacherId);
        if (!teacher || teacher.role !== 'teacher') throw new Error('Invalid teacher');
        teacher.followers = teacher.followers.filter((id: string) => id !== studentId);
        await teacher.save();
        return teacher;
    }
}

export default new UserService();