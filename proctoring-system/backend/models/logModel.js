const logs = [];

module.exports = {
  addLog: (eventData) => {
    logs.push(eventData);
  },
  getLogs: () => {
    return logs;
  },
};