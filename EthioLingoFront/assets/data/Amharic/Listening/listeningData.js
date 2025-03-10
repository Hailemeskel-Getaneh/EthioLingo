const topicData = {
  '1-Greetings': require('./greetings').default,
  '2-Emergency': require('./emergency').default,
  '3-Number': require('./greetings').default, // Fallback to greetings.js since number.js is missing
  '4-Family': require('./greetings').default,
  '5-Definite Article': require('./greetings').default,
  '6-Sentence & Months': require('./greetings').default,
  '7-Adjective': require('./greetings').default,
  '8-Alphabets': require('./alphabets').default,
};