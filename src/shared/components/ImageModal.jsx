import React, { useState, useEffect, useCallback } from 'react';

/**
 * Image modal component for full-screen image viewing
 * Handles keyboard (ESC) and click events to close
 * Exposes window.openImageModal() for legacy code compatibility
 */
function ImageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  // Expose global function for legacy code and React components
  useEffect(() => {
    window.openImageModal = (img) => {
      setImageSrc(img.src);
      setImageAlt(img.alt || '');
      setIsOpen(true);
    };

    // Maintain backward compatibility
    window.modal_image = window.openImageModal;

    return () => {
      delete window.openImageModal;
      delete window.modal_image;
    };
  }, []);

  // Handle ESC key to close
  const handleKeyUp = useCallback((event) => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keyup', handleKeyUp);
      return () => window.removeEventListener('keyup', handleKeyUp);
    }
  }, [isOpen, handleKeyUp]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" style={{ display: 'block' }}>
      <span className="close" onClick={handleClose}>
        &times;
      </span>
      <img className="modal-content" src={imageSrc} alt={imageAlt} />
      <div id="caption">{imageAlt}</div>
    </div>
  );
}

export default ImageModal;
