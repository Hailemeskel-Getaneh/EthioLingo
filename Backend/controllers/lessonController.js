const getLessons = (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, title: 'Basics 1', category: 'General' },
      { id: 2, title: 'Greetings', category: 'Basics' },
    ],
  });
};

module.exports = { getLessons };
