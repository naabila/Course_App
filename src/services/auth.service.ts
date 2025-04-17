import { User } from '../models/user.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export const registerUser = async (name: string, email: string, password: string, role: string) => {
    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    const user = new User({ name, email, password: hashedPassword, role });
    return await user.save();
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    return { token, user };
};

export const getUserById = async (id: string) => {
    return await User.findById(id);
};