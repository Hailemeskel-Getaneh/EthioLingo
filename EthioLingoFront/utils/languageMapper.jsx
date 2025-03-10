
import languages from '../assets/data/languages.json';

export const mapLanguage = (source, target) => {
  const sourceLang = languages.languages.find(lang => lang.code === source);
  const targetLang = languages.languages.find(lang => lang.code === target);
  return { sourceLanguage: sourceLang.name, targetLanguage: targetLang.name, script: targetLang.script };
};