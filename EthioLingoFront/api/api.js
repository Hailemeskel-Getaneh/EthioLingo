
import axios from 'axios';

const API_URL = 'http://192.168.72.249:4000/api'

export const getLessons = async (language, category, lessonName) => {
  const response = await axios.get(`${API_URL}/lessons`, {
    params: { language, category, lessonName }
  });
  return response.data;
};