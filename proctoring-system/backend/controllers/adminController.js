const logModel = require('../models/logModel');
const riskCalculator = require('../utils/riskCalculator');

module.exports = {
  getLogs: (req, res) => {
    const logs = logModel.getLogs();
    const riskScore = riskCalculator.calculate(logs);
    res.json({ logs, riskScore });
  },
};