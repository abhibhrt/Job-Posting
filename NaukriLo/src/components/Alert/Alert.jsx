import { useState, useEffect, useCallback } from 'react';
import './alert.css';

export const useAlert = () => {
  const [alertState, setAlertState] = useState({ 
    messages: [],
    type: 'info', // success, error, warning, info
    visible: false,
    currentMessageIndex: 0
  });

  useEffect(() => {
    let timer;
    if (alertState.visible && alertState.messages.length > 0) {
      timer = setTimeout(() => {
        if (alertState.currentMessageIndex < alertState.messages.length - 1) {
          setAlertState(prev => ({ 
            ...prev, 
            currentMessageIndex: prev.currentMessageIndex + 1 
          }));
        } else {
          setAlertState(prev => ({ ...prev, visible: false }));
        }
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [alertState.visible, alertState.currentMessageIndex, alertState.messages]);

  const showAlert = useCallback((messages, type = 'info') => {
    setAlertState({ 
      messages: Array.isArray(messages) ? messages : [messages],
      type,
      visible: true,
      currentMessageIndex: 0
    });
  }, []);

  const handleClose = useCallback(() => {
    setAlertState(prev => ({ ...prev, visible: false }));
  }, []);

  const AlertComponent = useCallback(() => {
    if (!alertState.visible || alertState.messages.length === 0) return null;

    const getIcon = () => {
      switch (alertState.type) {
        case 'success': return '✓';
        case 'warning': return '⚠';
        case 'error': return '✕';
        case 'info':
        default: return 'i';
      }
    };

    return (
      <div className={`alert-container alert-${alertState.type} ${alertState.visible ? 'visible' : ''}`}>
        <div className="alert-icon">{getIcon()}</div>
        <div className="alert-content">
          <div className="alert-message">
            {alertState.messages[alertState.currentMessageIndex]}
          </div>
          <div className="alert-progress">
            <div 
              className="alert-progress-bar" 
              style={{ animationDuration: '3000ms' }}
            />
          </div>
        </div>
        <button 
          className="alert-close" 
          onClick={handleClose}
        >
          &times;
        </button>
      </div>
    );
  }, [alertState, handleClose]);

  return { showAlert, AlertComponent };
};

const Alert = () => {
  const { AlertComponent } = useAlert();
  return <AlertComponent />;
};

export default Alert;