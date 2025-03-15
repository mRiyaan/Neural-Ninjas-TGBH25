const sessions = new Map();

module.exports = {
  createSession: (userId) => {
    const sessionId = Date.now().toString();
    const session = {
      userId,
      startTime: new Date(),
      endTime: null,
    };
    sessions.set(sessionId, session);
    return sessionId;
  },
  getSession: (sessionId) => {
    return sessions.get(sessionId);
  },
  updateSession: (sessionId, update) => {
    const session = sessions.get(sessionId);
    if (session) {
      Object.assign(session, update);
    }
  },
  terminateSession: (sessionId) => {
    sessions.delete(sessionId);
  },
  validateSession: (sessionId) => {
    const session = sessions.get(sessionId);
    if (!session) return false;
    const now = new Date();
    const diff = now - session.startTime;
    return diff <= process.env.SESSION_TIMEOUT * 1000;
  },
};