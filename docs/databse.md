
## Database Schema for EthioLingo

### Overview
The database is designed to support a language learning app with features like user authentication, lesson management, user progress tracking, payment transactions, and feedback. It uses MongoDB (NoSQL) for flexibility in handling JSON-like lesson content and user progress data.

---

### Tables/Collections

#### 1. `users` Collection
Stores user authentication and basic information.

- `user_id` (Primary Key, UUID, e.g., "uuid-123")
- `full_name` (String, Not Null, e.g., "John Doe")
- `email` (String, Unique, Not Null, e.g., "john.doe@example.com")
- `password` (String, Hashed, Not Null, e.g., "hashed_password")
- `verification_code` (String, e.g., "123456")
- `verification_code_generated_time` (DateTime, e.g., "2025-03-15T10:00:00Z")
- `created_at` (DateTime, Default: Current Timestamp)
- `updated_at` (DateTime, Default: Current Timestamp)

---

#### 2. `profiles` Collection
Stores user-specific settings and preferences.

- `user_id` (Foreign Key to `users.user_id`, Primary Key, e.g., "uuid-123")
- `status` (Enum: `free`, `paid`, Not Null, Default: `free`)
- `profile_picture` (String, URL or File Path, e.g., "https://s3.amazonaws.com/profile.jpg")
- `native_language` (String, e.g., "English")
- `learning_language` (String, Not Null, e.g., "Amharic")
- `progress_id` (Foreign Key to `user_progress.progress_id`, e.g., "uuid-progress-456")
- `goal` (JSON, e.g., `{ "hours_per_week": 5, "target_date": "2025-06-01" }`)
- `favorite_words` (Array of Strings, e.g., `["hello", "selam"]`)
- `created_at` (DateTime, Default: Current Timestamp)
- `updated_at` (DateTime, Default: Current Timestamp)

---

#### 3. `lessons` Collection
Stores lesson data, including content for listening, speaking, reading, and writing exercises.

- `lesson_id` (Primary Key, UUID, e.g., "uuid-456")
- `lesson_name` (String, Not Null, e.g., "2-Emergency")
- `language` (String, Not Null, e.g., "Amharic")
- `premium_required` (Boolean, Default: False)
- `content` (JSON, Structured as below)
  - `listening`:
    - `audioFiles`: Array of objects
      - `source` (String, Cloud URL, e.g., "https://ethiolingo-s3-bucket.s3.amazonaws.com/audio/Record033.mp3")
      - `correctText` (String, e.g., "Help!")
      - `correctOption` (String, e.g., "አዴን!")
      - `options` (Array of Strings, e.g., `["አዴን!", "ሰላም", "እንዴት ነህ?", "ደህና"]`)
  - `reading`:
    - `readingExercises`: Array of objects
      - `id` (Number, e.g., 1)
      - `motherTongueText` (String, e.g., "አዴን!")
      - `learningText` (String, e.g., "Help!")
      - `audioSource` (String, Cloud URL, e.g., "https://ethiolingo-s3-bucket.s3.amazonaws.com/audio/Record033.mp3")
  - `speaking`:
    - `speakingExercises`: Array of objects
      - `id` (Number, e.g., 1)
      - `motherTongueText` (String, e.g., "አዴን! (Help!)")
      - `learningText` (String, e.g., "Help!")
      - `audioSource` (String, Cloud URL, e.g., "https://ethiolingo-s3-bucket.s3.amazonaws.com/audio/Record033.mp3")
  - `writing`:
    - `writingExercises`: Array of objects
      - `id` (Number, e.g., 1)
      - `motherTongueText` (String, e.g., "ሰላም")
      - `equivalentText` (String, e.g., "Hello")
- `created_at` (DateTime, Default: Current Timestamp)
- `updated_at` (DateTime, Default: Current Timestamp)

---

#### 4. `user_progress` Collection
Tracks user progress, achievements, and activity.

- `progress_id` (Primary Key, UUID, e.g., "uuid-progress-789")
- `user_id` (Foreign Key to `users.user_id`, Not Null, e.g., "uuid-123")
- `achievements` (JSON, e.g., `["Completed 1-Greetings", "Mastered Listening"]`)
- `notifications` (JSON, e.g., `["New lesson available"]`)
- `points` (Integer, Default: 0, e.g., 150)
- `progress` (JSON, e.g., 
  ```json
  {
    "1-Greetings": {
      "writing": { "score": 85, "completed": true },
      "listening": { "score": 90, "completed": true },
      "reading": { "score": 80, "completed": true },
      "speaking": { "score": 75, "completed": true }
    },
    "2-Emergency": {
      "writing": { "score": 60, "completed": false }
    }
  }
  ```
- `last_practiced_date` (DateTime, e.g., "2025-03-15T12:00:00Z")
- `created_at` (DateTime, Default: Current Timestamp)
- `updated_at` (DateTime, Default: Current Timestamp)

---

#### 5. `transactions` Collection
Manages payment transactions for premium plans.

- `transaction_id` (Primary Key, UUID, e.g., "uuid-txn-101")
- `user_id` (Foreign Key to `users.user_id`, Not Null, e.g., "uuid-123")
- `phone_number` (String, e.g., "+251912345678")
- `payment_type` (String, e.g., "Telebirr", "CBE")
- `amount` (Decimal, Not Null, e.g., 100.00)
- `payment_date` (DateTime, Not Null, e.g., "2025-03-15T14:00:00Z")
- `txn_id` (String, Unique, Not Null, e.g., "chapa-txn-12345")
- `status` (Enum: `pending`, `completed`, `failed`, Default: `pending`)
- `created_at` (DateTime, Default: Current Timestamp)
- `updated_at` (DateTime, Default: Current Timestamp)

---

#### 6. `feedbacks` Collection
Stores user feedback.

- `feedback_id` (Primary Key, UUID, e.g., "uuid-feedback-202")
- `user_id` (Foreign Key to `users.user_id`, Not Null, e.g., "uuid-123")
- `message` (Text, Not Null, e.g., "Great app, but needs more lessons!")
- `created_at` (DateTime, Default: Current Timestamp)
- `updated_at` (DateTime, Default: Current Timestamp)

---

### Notes
- **Database Choice**: MongoDB is used for its flexibility with JSON data (e.g., `content` in `lessons`, `progress` in `user_progress`), which aligns with the nested structure of lesson exercises.
- **Primary Keys**: UUIDs are used for scalability and uniqueness across collections.
- **Foreign Keys**: Ensure referential integrity (e.g., `user_id` links `users` to `profiles`, `user_progress`, `transactions`, and `feedbacks`).
- **Cloud Storage**: Audio files (e.g., `source`, `audioSource`) reference cloud URLs (e.g., AWS S3) for scalability and performance.
- **Progress Tracking**: The `progress` field in `user_progress` uses a nested JSON structure to track completion and scores per lesson and category, enabling lesson unlocking logic (e.g., unlock "2-Emergency" after completing "1-Greetings").
- **Timestamps**: `created_at` and `updated_at` are added to all collections for audit trails and debugging.

---

