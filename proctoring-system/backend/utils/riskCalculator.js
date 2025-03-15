module.exports = {
    calculate: (logs) => {
      let riskScore = 0;
      logs.forEach((log) => {
        if (log.type === 'windowSwitch') riskScore += 10;
        if (log.type === 'shortcutViolation') riskScore += 5;
        if (log.type === 'cursorLeave') riskScore += 2;
      });
      return riskScore;
    },
  };