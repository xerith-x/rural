# Rural Edu - Backend API Testing Guide

This guide explains the project structure and how to test the newly created APIs using Postman.

## Project Structure Explained

```text
backend/
├── config/
│   └── db.js                 # MySQL connection pool configuration
├── controllers/
│   ├── authController.js     # Logic for user registration and login
│   ├── courseController.js   # Logic for fetching and creating courses
│   ├── lessonController.js   # Logic for fetching lessons by course and creating lessons
│   └── quizController.js     # Logic for fetching quizzes and submitting scores
├── middleware/
│   └── authMiddleware.js     # JWT verification middleware to protect specific routes
├── routes/
│   ├── authRoutes.js         # Routes mapping to authController (/api/auth)
│   ├── courseRoutes.js       # Routes mapping to courseController (/api/courses)
│   ├── lessonRoutes.js       # Routes mapping to lessonController (/api/lessons)
│   └── quizRoutes.js         # Routes mapping to quizController (/api/quiz)
├── .env                      # Environment variables (DB credentials, JWT_SECRET, PORT)
├── init.sql                  # Initial database schema and sample data
├── package.json              # Project metadata and dependencies
└── server.js                 # Entry point, sets up Express and routes
```

---

## Testing with Postman

To test the APIs, make sure your Node.js server is running (`npm start` or `node server.js`) and MySQL is running with the `rural_edu` database provisioned by `init.sql`.

Base URL: `http://localhost:5000` (or your configured port).

### 1. Authentication APIs

#### A. Register a User
- **Method:** `POST`
- **URL:** `${Base_URL}/api/auth/register`
- **Body (JSON):**
  ```json
  {
      "name": "Alice Teacher",
      "email": "alice@example.com",
      "password": "password123",
      "role": "teacher",
      "school": "Rural High"
  }
  ```

#### B. Login User
- **Method:** `POST`
- **URL:** `${Base_URL}/api/auth/login`
- **Body (JSON):**
  ```json
  {
      "email": "alice@example.com",
      "password": "password123"
  }
  ```
- **Action Required:** Keep the `token` from the response. You will need it in the Authorization header for protected routes.

---

### 2. Protected Routes (Require JWT)
For any route marked as "Protected", you must add the token to the Headers in Postman:
- **Key:** `Authorization`
- **Value:** `Bearer <your_jwt_token_here>`

---

### 3. Course APIs

#### A. Get All Courses
- **Method:** `GET`
- **URL:** `${Base_URL}/api/courses`
- **Access:** Public (No token needed)

#### B. Create a Course
- **Method:** `POST`
- **URL:** `${Base_URL}/api/courses`
- **Access:** Protected (Requires Teacher Token)
- **Body (JSON):**
  ```json
  {
      "title": "Mathematics 101",
      "subject": "Math",
      "description": "Basic high school mathematics."
  }
  ```

---

### 4. Lesson APIs

#### A. Get Lessons By Course ID
- **Method:** `GET`
- **URL:** `${Base_URL}/api/lessons/1`  *(assuming course ID is 1)*
- **Access:** Public (No token needed)

#### B. Create a Lesson
- **Method:** `POST`
- **URL:** `${Base_URL}/api/lessons`
- **Access:** Protected (Requires Teacher Token)
- **Body (JSON):**
  ```json
  {
      "course_id": 1,
      "title": "Algebra Basics",
      "video_url": "https://example.com/algebra.mp4",
      "pdf_url": "https://example.com/algebra-notes.pdf"
  }
  ```

---

### 5. Quiz APIs

#### A. Get Quiz Questions By Lesson ID
- **Method:** `GET`
- **URL:** `${Base_URL}/api/quiz/1` *(assuming lesson ID is 1)*
- **Access:** Public (No token needed)

#### B. Submit Quiz Score
- **Method:** `POST`
- **URL:** `${Base_URL}/api/quiz/submit`
- **Access:** Protected (Requires Student Token)
- **Body (JSON):**
  ```json
  {
      "lesson_id": 1,
      "score": 85
  }
  ```

*(To test this, make sure to login / register a user with the `student` role and use their token).*
