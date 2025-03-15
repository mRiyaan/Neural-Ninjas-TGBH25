const sessionModel = require('../models/sessionModel');
const serverClock = require('../utils/serverClock');

module.exports = {
  login: (req, res) => {
    const userId = req.body.userId;
    const sessionId = sessionModel.createSession(userId);
    res.json({ sessionId, serverTime: serverClock.getCurrentTime() });
  },
  resume: (req, res) => {
    const sessionId = req.body.sessionId;
    if (sessionModel.validateSession(sessionId)) {
      res.json({ message: 'Session resumed', serverTime: serverClock.getCurrentTime() });
    } else {
      sessionModel.terminateSession(sessionId);
      res.status(400).json({ error: 'Session expired' });
    }
  },
};