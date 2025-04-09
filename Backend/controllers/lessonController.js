import Lesson from '../models/Lesson.js';

export const getLessons = async (req, res) => {
  try {
    const { language, category, lessonName } = req.query;
    const query = {};

    if (language) query.language = { $regex: new RegExp(`^${language}$`, 'i') };
    if (lessonName) query.lesson_name = lessonName;

    const lessons = await Lesson.find(query);

    const filteredLessons = lessons.map(lesson => {
      const filteredContent = category && lesson.content[category.toLowerCase()]
        ? { [category.toLowerCase()]: lesson.content[category.toLowerCase()] }
        : lesson.content;

      return {
        lesson_id: lesson.lesson_id,
        lesson_name: lesson.lesson_name,
        language: lesson.language,
        content: filteredContent
      };
    });

    res.json({
      success: true,
      data: filteredLessons
    });
  } catch (error) {
    console.error('Error fetching lessons:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};