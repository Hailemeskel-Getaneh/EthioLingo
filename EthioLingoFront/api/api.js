
import axios from 'axios';

const API_URL = 'http://192.168.163.40:4000'

export const getLessons = async (language, category, lessonName) => {
  const response = await axios.get(`${API_URL}/lessons`, {
    params: { language, category, lessonName }
  });
  return response.data;
};