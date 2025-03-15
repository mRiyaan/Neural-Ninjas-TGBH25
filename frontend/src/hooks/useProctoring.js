import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function useProctoring() {
  const [isCursorOutside, setIsCursorOutside] = useState(false);
  const [isFullScreenExited, setIsFullScreenExited] = useState(false);
  const [windowSwitchCount, setWindowSwitchCount] = useState(0);
  const [shortcutViolations, setShortcutViolations] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [serverTime, setServerTime] = useState(new Date().toISOString());

  const lastVisibilityChange = useRef(Date.now());

  const sendEventLog = async (eventData) => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      const response = await axios.post('http://localhost:3001/assessment/log', {
        ...eventData,
        sessionId,
      });
      setServerTime(response.data.serverTime);
    } catch (error) {
      console.error('Failed to send event log', error);
    }
  };

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        setIsCursorOutside(true);
        sendEventLog({ type: 'cursorLeave', details: 'Cursor left viewport' });
      } else {
        setIsCursorOutside(false);
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreenExited(true);
        sendEventLog({ type: 'fullscreenExit', details: 'Fullscreen exited' });
      } else {
        setIsFullScreenExited(false);
      }
    };

    const handleVisibilityChange = () => {
      const now = Date.now();
      if (document.hidden) {
        lastVisibilityChange.current = now;
      } else {
        const diff = now - lastVisibilityChange.current;
        if (diff > 100) {
          setWindowSwitchCount((prev) => prev + 1);
          sendEventLog({ type: 'windowSwitch', details: 'Window/tab switch detected' });
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        sendEventLog({ type: 'shortcutViolation', details: 'F12/Inspect element blocked' });
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v')) {
        e.preventDefault();
        sendEventLog({ type: 'shortcutViolation', details: 'Copy/paste blocked' });
      }
      if ((e.altKey && e.key === 'F4') || (e.metaKey && (e.key === 'w' || e.key === 'q'))) {
        e.preventDefault();
        setShortcutViolations((prev) => [...prev, e.key]);
        sendEventLog({ type: 'shortcutViolation', details: `Shortcut ${e.key} blocked` });
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return {
    isCursorOutside,
    isFullScreenExited,
    windowSwitchCount,
    shortcutViolations,
    warnings,
    sendEventLog,
    serverTime,
  };
}

export default useProctoring;