import express from 'express';
import UserProgress from '../models/userProgressModel.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();



router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userProgress = await UserProgress.findOne({ userId });

    if (!userProgress) {
      return res.status(404).json({ message: 'User progress not found for this userId' });
    }
    res.status(200).json(userProgress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user progress', error: error.message });
  }
});

router.get('/:progressId', async (req, res) => {
  try {
    const { progressId } = req.params;
    const userProgress = await UserProgress.findOne({ progressId });

    if (!userProgress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }
    res.status(200).json(userProgress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress record', error: error.message });
  }
});

router.post('/update', async (req, res) => {
  try {
    const { progressId, updates } = req.body;

    if (!progressId || !updates) {
      return res.status(400).json({ message: 'progressId and updates are required' });
    }

    const updatedProgress = await UserProgress.findOneAndUpdate(
      { progressId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedProgress) {
      return res.status(404).json({ message: 'Progress record not found for update' });
    }
    res.status(200).json(updatedProgress);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user progress', error: error.message });
  }
});

router.post('/add-achievement', async (req, res) => {
  try {
    const { progressId, achievement } = req.body;

    if (!progressId || !achievement) {
      return res.status(400).json({ message: 'progressId and achievement are required' });
    }

    const updatedProgress = await UserProgress.findOneAndUpdate(
      { progressId },
      { $addToSet: { achievements: achievement } },
      { new: true }
    );

    if (!updatedProgress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }
    res.status(200).json(updatedProgress);
  } catch (error) {
    res.status(500).json({ message: 'Error adding achievement', error: error.message });
  }
});

router.post('/remove-achievement', async (req, res) => {
  try {
    const { progressId, achievement } = req.body;

    if (!progressId || !achievement) {
      return res.status(400).json({ message: 'progressId and achievement are required' });
    }

    const updatedProgress = await UserProgress.findOneAndUpdate(
      { progressId },
      { $pull: { achievements: achievement } },
      { new: true }
    );

    if (!updatedProgress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }
    res.status(200).json(updatedProgress);
  } catch (error) {
    res.status(500).json({ message: 'Error removing achievement', error: error.message });
  }
});

router.post('/add-notification', async (req, res) => {
  try {
    const { progressId, notification } = req.body;

    if (!progressId || !notification) {
      return res.status(400).json({ message: 'progressId and notification are required' });
    }

    const updatedProgress = await UserProgress.findOneAndUpdate(
      { progressId },
      { $addToSet: { notifications: notification } },
      { new: true }
    );

    if (!updatedProgress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }
    res.status(200).json(updatedProgress);
  } catch (error) {
    res.status(500).json({ message: 'Error adding notification', error: error.message });
  }
});

router.post('/remove-notification', async (req, res) => {
  try {
    const { progressId, notification } = req.body;

    if (!progressId || !notification) {
      return res.status(400).json({ message: 'progressId and notification are required' });
    }

    const updatedProgress = await UserProgress.findOneAndUpdate(
      { progressId },
      { $pull: { notifications: notification } },
      { new: true }
    );

    if (!updatedProgress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }
    res.status(200).json(updatedProgress);
  } catch (error) {
    res.status(500).json({ message: 'Error removing notification', error: error.message });
  }
});

export default router;
