const Feedback = require('../models/feedbackModel');

exports.createFeedback = async (req, res) => {
  try {
    const feedbackId = await Feedback.create(req.body);
    res.status(201).json({ success: true, feedbackId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.getAll();
    res.json({ success: true, data: feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
