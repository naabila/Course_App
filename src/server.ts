import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI;
if (!MONGODB_URI || !MONGODB_URI.startsWith('mongodb')) {
    throw new Error('MONGO_URI environment variable is missing or invalid. Please set it in your .env file.');
}

const startServer = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any);
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err: any) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};

startServer();