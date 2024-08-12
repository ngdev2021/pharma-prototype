// routes/drugShortage.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const DrugShortage = require('../models/DrugShortage.js');

router.get('/', auth, async (req, res) => {
  try {
    const drugShortages = await DrugShortage.find({});
    res.json(drugShortages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new drug shortage feedback
// this is the frontend code   const handleSubmitFeedback = async () => {
//   try {
//     const response = await axios.post(
//       `/drug-shortages/${shortageId}/feedback`,
//       { message: feedback }, // Assuming feedbackMessage is the feedback content
//       {
//         headers: {
//           'x-auth-token': localStorage.getItem('token'),
//         },
//       }
//     );
//     console.log('Feedback submitted:', response.data);
//   } catch (error) {
//     console.error('Error submitting feedback:', error);
//   }
// };
router.post(
  '/drug-shortages/:id/feedback',
  auth,
  async (req, res) => {
    try {
      const drugShortage = await DrugShortage.findById(req.params.id);
      if (!drugShortage) {
        return res
          .status(404)
          .json({ message: 'Drug shortage not found' });
      }

      // Append the feedback, assuming req.body contains the feedback message
      const feedback = {
        message: req.body.message,
        userId: req.user.id, // Assuming `auth` middleware populates `req.user`
      };

      drugShortage.feedback.push(feedback);
      await drugShortage.save();

      res.status(201).json(drugShortage.feedback);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
