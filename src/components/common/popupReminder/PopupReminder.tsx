import React, { useState, useEffect } from "react";
import { X, Bell, CheckCircle } from "lucide-react";
import "./popupReminder.scss";

interface PopupReminderProps {
  autoShowDelay?: number; // milliseconds
}

const PopupReminder: React.FC<PopupReminderProps> = ({ autoShowDelay = 5000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("hasSeenPopup");
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, autoShowDelay);

      return () => clearTimeout(timer);
    }
  }, [autoShowDelay]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      localStorage.setItem("hasSeenPopup", "true");
    }, 300);
  };

  const handleEnableNotifications = () => {
    // Request notification permission
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("MyDearProperty", {
            body: "You'll now receive updates about new properties!",
            icon: "/logo.png",
          });
        }
      });
    }
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`popup-overlay ${isClosing ? "popup-overlay-closing" : ""}`}
        onClick={handleClose}
      />

      {/* Popup */}
      <div className={`popup-container ${isClosing ? "popup-closing" : ""}`}>
        <button
          onClick={handleClose}
          className="popup-close-btn"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        <div className="popup-icon">
          <Bell size={48} className="text-green-700" />
        </div>

        <h3 className="popup-title">Stay Updated!</h3>
        
        <p className="popup-description">
          Enable notifications to get instant alerts about new properties that match your preferences.
        </p>

        <div className="popup-benefits">
          <div className="benefit-item">
            <CheckCircle size={20} className="text-green-600" />
            <span>New property alerts</span>
          </div>
          <div className="benefit-item">
            <CheckCircle size={20} className="text-green-600" />
            <span>Price drop notifications</span>
          </div>
          <div className="benefit-item">
            <CheckCircle size={20} className="text-green-600" />
            <span>Exclusive deals</span>
          </div>
        </div>

        <div className="popup-actions">
          <button
            onClick={handleEnableNotifications}
            className="popup-btn popup-btn-primary"
          >
            Enable Notifications
          </button>
          <button
            onClick={handleClose}
            className="popup-btn popup-btn-secondary"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </>
  );
};

export default PopupReminder;