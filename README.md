# Course Learning App

## Overview
The Course Learning App is a web application designed to facilitate online learning by connecting students and teachers. It provides features for course management, lesson tracking, and user engagement.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- TypeScript
- Mongoose

## Features

- User registration/login with role-based access (Student/Teacher)
- Teachers: Manage courses, lessons, quizzes, view analytics
- Students: Enroll, track progress, like, feedback, follow teachers
- Global error handling with standardized responses
- Paginated, filtered course listings with search

### User Authentication
- Users can create accounts with name, email, and password.
- Role-based access control for two user roles: Student and Teacher.

### Teacher Features
- Add, edit, and delete courses with title and description.
- Manage lessons within courses.
- Create and manage topics or quizzes within lessons.
- View course analytics, including enrolled students and feedback.

### Student Features
- Browse and enroll in courses.
- Access course lessons, topics, and quizzes with progress tracking.
- Like courses and provide feedback.
- Follow teachers.

### Error Handling
- Global error handling middleware for consistent error responses.
- Detailed error messages with appropriate status codes.

### Data Retrieval
- API endpoint for paginated and filtered course listings.
- Case-insensitive search support for various fields.

## API Endpoints

- **Authentication:** `/api/v1/auth`
- **Courses:** `/api/v1/course`
- **Lessons:** `/api/v1/lesson`
- **Quizzes:** `/api/v1/quiz`
- **Feedback:** `/api/v1/feedback`
- **Users:** `/api/v1/user`

## Getting Started
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up the MongoDB database.
4. Configure environment variables.
5. Start the server using `npm run dev`.

## License
This project is licensed under the MIT License.