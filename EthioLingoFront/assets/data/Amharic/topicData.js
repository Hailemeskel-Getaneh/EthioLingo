// Map topic titles to their data files for each category
const listeningData = {
    '1-Greetings': require('./Listening/greetings').default,
    '2-Emergency': require('./Listening/emergency').default,
    '3-Number': require('./Listening/number').default,
    '4-Family': require('./Listening/family').default,
    '5-Definite Article': require('./Listening/definiteArticle').default,
    '6-Sentence & Months': require('./Listening/sentenceMonths').default,
    '7-Adjective': require('./Listening/adjective').default,
  };
  
//   const speakingData = {
//     '1-Greetings': require('./Speaking/greetings').default,
//     '2-Emergency': require('./Speaking/emergency').default,
//     '3-Number': require('./Speaking/number').default,
//     '4-Family': require('./Speaking/family').default,
//     '5-Definite Article': require('./Speaking/definiteArticl').default,
//     '6-Sentence & Months': require('./Speaking/sentenceMonth').default,
//     '7-Adjective': require('./Speaking/adjectives').default,
//   };
  
//   const readingData = {
//     '1-Greetings': require('./Reading/greetings').default,
//     '2-Emergency': require('./Reading/emergency').default,
//     '3-Number': require('./Reading/number').default,
//     '4-Family': require('./Reading/family').default,
//     '5-Definite Article': require('./Reading/definiteArticl').default,
//     '6-Sentence & Months': require('./Reading/sentenceMonth').default,
//     '7-Adjective': require('./Reading/adjectives').default,
//   };
  
//   const writingData = {
//     '1-Greetings': require('./Writing/greetings').default,
//     '2-Emergency': require('./Writing/emergency').default,
//     '3-Number': require('./Writing/number').default,
//     '4-Family': require('./Writing/family').default,
//     '5-Definite Article': require('./Writing/definiteArticl').default,
//     '6-Sentence & Months': require('./Writing/sentenceMonth').default,
//     '7-Adjective': require('./Writing/adjectives').default,
//   };
  
//   // Fallback data if a topic is missing
//   const defaultData = {
//     title: 'Topic Not Found',
//     phrases: [{ text: 'No content available', translation: 'N/A' }],
//   };
  
//   export const getTopicData = (topicTitle, category) => {
//     let data;
//     switch (category) {
//       case 'listening':
//         data = listeningData[topicTitle] || defaultData;
//         break;
//       case 'speaking':
//         data = speakingData[topicTitle] || defaultData;
//         break;
//       case 'reading':
//         data = readingData[topicTitle] || defaultData;
//         break;
//       case 'writing':
//         data = writingData[topicTitle] || defaultData;
//         break;
//       default:
//         data = defaultData;
//     }
//     return data;
//   };