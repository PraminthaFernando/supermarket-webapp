import React, { FC, useState, useEffect } from "react";

interface PopupProps {
  title: string;
  message: string;
  onClose: () => void;
  show: boolean;
}

const Popup: FC<PopupProps> = ({ title, message, onClose, show }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClose = () => {
    setShowPopup(false);
    onClose();
  };

  useEffect(() => {
    setShowPopup(show);
  }, [show]);

  return (
    <>
      <div className={`popup ${showPopup ? "show" : ""}`}>
        <div className="popup-content">
          <h2>{title}</h2>
          <p>{message}</p>
          <button onClick={handleClose}>OK</button>
        </div>
      </div>
    </>
  );
};

export default Popup;
