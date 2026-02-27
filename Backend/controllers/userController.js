const updateProfile = (req, res) => {
  res.json({ success: true, message: 'Profile updated successfully' });
};

module.exports = { updateProfile };
