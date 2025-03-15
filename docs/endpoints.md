
```markdown
# Meeting Notes - 15/03/2025  

## Backend Endpoints for EthioLingo  

### Base URL: `/api/v1`  

## 1. Authentication Endpoints (`/auth`)  

### Sign Up  
- **Route:** `POST /auth/signup`  
- **Description:** Register a new user.  
- **Request Body:**  
  ```json
  {
    "fullName": "String",
    "email": "String",
    "password": "String"
  }
  ```
- **Response:**  
  ```json
  {
    "userId": "String",
    "token": "String"
  }
  ```
- **Authentication:** None  

### Login  
- **Route:** `POST /auth/login`  
- **Description:** Log in an existing user.  
- **Request Body:**  
  ```json
  {
    "email": "String",
    "password": "String"
  }
  ```
- **Response:**  
  ```json
  {
    "userId": "String",
    "token": "String"
  }
  ```
- **Authentication:** None  

### Forget Password  
- **Route:** `POST /auth/forgetpassword`  
- **Description:** Request password reset via OTP.  
- **Request Body:**  
  ```json
  {
    "email": "String"
  }
  ```
- **Response:**  
  ```json
  {
    "message": "OTP sent"
  }
  ```
- **Authentication:** None  

### Reset Password  
- **Route:** `POST /auth/resetpassword`  
- **Description:** Reset password using OTP.  
- **Request Body:**  
  ```json
  {
    "email": "String",
    "verificationCode": "String",
    "newPassword": "String"
  }
  ```
- **Response:**  
  ```json
  {
    "message": "Password reset"
  }
  ```
- **Authentication:** None  

### Verify Session  
- **Route:** `GET /auth/verify`  
- **Description:** Verify user session with JWT.  
- **Request Body:** None (JWT in header)  
- **Response:**  
  ```json
  {
    "userId": "String",
    "fullName": "String",
    "email": "String"
  }
  ```
- **Authentication:** JWT  

---

## 2. Profile Endpoints (`/profile`)  

### Update Profile  
- **Route:** `PUT /profile/update`  
- **Description:** Update user profile details.  
- **Request Body:**  
  ```json
  {
    "nativeLanguage": "String",
    "learningLanguage": "String",
    "goal": { "time": "Number" }
  }
  ```
- **Response:**  
  ```json
  {
    "profile": "Object"
  }
  ```
- **Authentication:** JWT  

### Get Profile  
- **Route:** `GET /profile`  
- **Description:** Fetch user profile.  
- **Request Body:** None  
- **Response:**  
  ```json
  {
    "profile": "Object"
  }
  ```
- **Authentication:** JWT  

### Upload Profile Picture  
- **Route:** `POST /profile/picture`  
- **Description:** Upload a profile picture.  
- **Request Body:** `{ image: File }` (multipart/form-data)  
- **Response:**  
  ```json
  {
    "profilePicture": "String"
  }
  ```
- **Authentication:** JWT  

### Process Payment  
- **Route:** `POST /profile/payment`  
- **Description:** Process payment for premium access.  
- **Request Body:**  
  ```json
  {
    "phoneNumber": "String",
    "paymentType": "String",
    "amount": "Number"
  }
  ```
- **Response:**  
  ```json
  {
    "transactionId": "String",
    "status": "String"
  }
  ```
- **Authentication:** JWT  

---

## 3. Lesson Endpoints (`/lessons`)  

### Fetch Lessons  
- **Route:** `GET /lessons/fetch`  
- **Description:** Fetch lessons by language and category.  
- **Query Params:** `{ language, category, limit, page }`  
- **Response:** `{ lessons: Array }`  
- **Authentication:** JWT (optional for free lessons)  

### Get Specific Lesson  
- **Route:** `GET /lessons/:lessonId`  
- **Description:** Fetch a specific lesson by ID.  
- **Response:** `{ lesson: Object }`  
- **Authentication:** JWT (checks premium status)  

### Download Lessons  
- **Route:** `POST /lessons/download`  
- **Description:** Request lesson pack for offline use.  
- **Request Body:** `{ lessonIds: Array }`  
- **Response:** `{ downloadUrl: String }`  
- **Authentication:** JWT  

---

## 4. Progress Endpoints (`/progress`)  

### Get Progress  
- **Route:** `GET /progress`  
- **Description:** Fetch user’s learning progress.  
- **Response:** `{ progress: Array, points: Number, achievements: Array }`  
- **Authentication:** JWT  

### Update Progress  
- **Route:** `POST /progress/update`  
- **Description:** Update progress for a lesson.  
- **Request Body:**  
  ```json
  {
    "lessonId": "String",
    "type": "String",
    "score": "Number",
    "completed": "Boolean"
  }
  ```
- **Response:** `{ updatedProgress: Object }`  
- **Authentication:** JWT  

### Get Badges  
- **Route:** `GET /progress/badges`  
- **Description:** Fetch earned badges.  
- **Response:** `{ badges: Array }`  
- **Authentication:** JWT  

---

## 5. Quiz Endpoints (`/quizzes`)  

### Get Quiz  
- **Route:** `GET /quizzes/:lessonId`  
- **Description:** Fetch quiz questions for a lesson.  
- **Response:** `{ questions: Array }`  
- **Authentication:** JWT  

### Submit Quiz  
- **Route:** `POST /quizzes/submit`  
- **Description:** Submit quiz answers and get feedback.  
- **Request Body:** `{ lessonId: String, answers: Array }`  
- **Response:** `{ score: Number, feedback: Object }`  
- **Authentication:** JWT  

---

## 6. Notification Endpoints (`/notifications`)  

### Get Notifications  
- **Route:** `GET /notifications`  
- **Description:** Fetch user notifications.  
- **Response:** `{ notifications: Array }`  
- **Authentication:** JWT  

### Update Notification Settings  
- **Route:** `PUT /notifications/settings`  
- **Description:** Update notification preferences.  
- **Request Body:** `{ enabled: Boolean }`  
- **Response:** `{ message: "Updated" }`  
- **Authentication:** JWT  

---

## 7. Feedback Endpoints (`/feedback`)  

### Submit Feedback  
- **Route:** `POST /feedback`  
- **Description:** Submit user feedback.  
- **Request Body:** `{ message: String, rating: Number }`  
- **Response:** `{ feedbackId: String }`  
- **Authentication:** JWT  

### Get Feedback  
- **Route:** `GET /feedback`  
- **Description:** Fetch user’s past feedback (optional).  
- **Response:** `{ feedback: Array }`  
- **Authentication:** JWT  

---

## 8. Transaction Endpoints (`/transactions`)  

### Get Transaction History  
- **Route:** `GET /transactions`  
- **Description:** Fetch user transaction history.  
- **Response:** `{ transactions: Array }`  
- **Authentication:** JWT  

### Verify Payment  
- **Route:** `POST /transactions/verify`  
- **Description:** Verify payment status (e.g., via Chapa webhook).  
- **Request Body:** `{ txnId: String, status: String }`  
- **Response:** `{ message: "Verified" }`  
- **Authentication:** None (Webhook)  
```  
