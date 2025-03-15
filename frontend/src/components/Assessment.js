import React, { useEffect, useState } from 'react';
import useProctoring from '../hooks/useProctoring';
import WarningModal from './WarningModal';
import axios from 'axios';

function Assessment() {
  const {
    isCursorOutside,
    isFullScreenExited,
    windowSwitchCount,
    shortcutViolations,
    warnings,
    sendEventLog,
    blockF12,
    blockCopyPaste,
    blockShortcuts,
    serverTime,
  } = useProctoring();

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [forceSubmit, setForceSubmit] = useState(false);

  useEffect(() => {
    if (isCursorOutside) {
      setWarningMessage('Warning: Cursor outside the exam area.');
      setShowWarningModal(true);
    } else if (isFullScreenExited) {
      setWarningMessage('Warning: Fullscreen exited.');
      setShowWarningModal(true);
    } else if (windowSwitchCount >= 2) {
      setWarningMessage('Alert: Too many window switches. Exam may be force submitted.');
      setShowWarningModal(true);
      if (windowSwitchCount >= 3) {
        setForceSubmit(true);
      }
    } else if (shortcutViolations.length > 0) {
      setWarningMessage('Warning: Shortcut violations detected.');
      setShowWarningModal(true);
    }
  }, [isCursorOutside, isFullScreenExited, windowSwitchCount, shortcutViolations]);

  useEffect(() => {
    if (forceSubmit) {
      axios.post('http://localhost:3001/assessment/forceSubmit', { sessionId: localStorage.getItem('sessionId') });
      alert("Exam has been force submitted");
    }
  },[forceSubmit])

  return (
    <div className="assessment-container">
      <h1>Assessment</h1>
      <p>Server Time: {serverTime}</p>
      {showWarningModal && (
        <WarningModal message={warningMessage} onClose={() => setShowWarningModal(false)} />
      )}
      {/* Exam questions, etc. */}
    </div>
  );
}

export default Assessment;