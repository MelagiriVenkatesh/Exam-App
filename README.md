## Project README File
Markdown

# Full-Stack Exam Portal - Fresher Assessment Project

This is a functional full-stack web application built as part of a fresher selection assessment. It features a complete student-side exam interface with user authentication, a timed quiz, and score reporting, all wrapped in a clean, modern user interface.

---

## Features

- ✅ **User Authentication:** Secure user registration and login using JWTs.
- ✅ **Protected Routes:** Exam and results pages are only accessible to logged-in users.
- ✅ **Dynamic Exam Interface:** Fetches 10 randomized multiple-choice questions from the backend API.
- ✅ **Interactive Quiz:** Users can navigate between questions using "Next" and "Previous" buttons.
- ✅ **Countdown Timer:** A 30-minute timer tracks the exam duration and triggers an auto-submit when time runs out.
- ✅ **Scoring System:** Submits all answers to the backend for automatic scoring.
- ✅ **Persistent Results:** The results page displays the final score and percentage, which persists on page reload for the current session.
- ✅ **Clean & Responsive UI:** A modern, clean, and responsive user interface built with CSS Modules.

---

## Technology Stack

- **Frontend:** React.js (Vite), React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT), bcrypt.js
- **API Client:** Axios
- **API Testing:** Postman

---

## Setup and Installation

To run this project locally, please follow these steps:

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (running locally or a MongoDB Atlas connection string)
- Git

### **1. Clone the Repository**
```bash
git clone <your_github_repository_url_here>
cd <project_folder_name>
```
### **2. Backend Setup**
Navigate to the backend directory and install the required dependencies.

Bash
```bash
cd backend
npm install
```

Next, create a .env file in the backend directory with the following variables:
```
PORT=5000
DB_URL=<your_mongodb_connection_string_here>
JWT_SECRET=<your_super_strong_jwt_secret_key_here>
To start the backend server, run:
```
Bash
```bash
npm start
The server will be running on http://localhost:5000.
```
### **3. Frontend Setup**
In a new terminal, navigate to the frontend directory and install the required dependencies.

Bash
```bash
cd frontend
npm install
```

Next, create a .env file in the frontend directory. Add the following variables, pointing to your running backend server:
```
VITE_REGISTER_API_URL=http://localhost:5000/api/auth/register
VITE_LOGIN_API_URL=http://localhost:5000/api/auth/login
VITE_EXAM_API_URL=http://localhost:5000/api/questions
VITE_SUBMIT_API_URL=http://localhost:5000/api/questions/submit
```

To start the frontend development server, run:

Bash
```bash
npm run dev
```

The application will be available at http://localhost:5173 (or another port specified by Vite).

API Testing
A Postman collection is included in the root of this repository (Exam_Portal_API.postman_collection.json) for easy API testing. You can import this file into Postman to test all available endpoints.
