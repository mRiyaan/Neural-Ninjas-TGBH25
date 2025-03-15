import React from 'react';

function WarningModal({ message, onClose }) {
  return (
    <div className="warning-modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default WarningModal;