
import Lesson from '../models/Lesson.js';


// get all lessons
export const getLessons = async (req, res) => {
  try {
    const { language, category, limit = 10, page = 1 } = req.query;
    const query = { language };
    if (category) query[`content.${category}`] = { $exists: true };

    const lessons = await Lesson.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      data: {
        lessons,
        total: await Lesson.countDocuments(query),
        page: Number(page),
        limit: Number(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get a lesson by a specific lesson by ID
export const getLessonById = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const lesson = await Lesson.findOne({ lesson_id: lessonId });
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }
    res.json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};