const logModel = require('../models/logModel');
const riskCalculator = require('../utils/riskCalculator');
const serverClock = require('../utils/serverClock');

module.exports = {
  logEvent: (req, res) => {
    const eventData = { ...req.body, timestamp: serverClock.getCurrentTime() };
    logModel.addLog(eventData);
    const riskScore = riskCalculator.calculate(logModel.getLogs());
    res.json({ riskScore, serverTime: serverClock.getCurrentTime() });
  },
  forceSubmit: (req,res) =>{
    //logic to force submit.
    res.json({message:"Force submit triggered"})
  }
};