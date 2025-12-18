import React, { useState, useEffect } from 'react';
import { INDEX_SOURCES, INDEX_IMAGE_DIR, ALT_TAG } from '../utils/constants.js';

/**
 * Displays a random image from the index image collection
 * Used on the home page for visual variety
 */
function RandomIndexImage() {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Select random image on mount
    const randomIndex = Math.floor(Math.random() * INDEX_SOURCES.length);
    setImageSrc(INDEX_IMAGE_DIR + INDEX_SOURCES[randomIndex]);
  }, []);

  const handleImageClick = () => {
    if (window.modal_image && imageSrc) {
      const img = { src: imageSrc, alt: ALT_TAG };
      window.modal_image(img);
    }
  };

  if (!imageSrc) {
    return null;
  }

  return (
    <img
      className="myImg"
      src={imageSrc}
      alt={ALT_TAG}
      onClick={handleImageClick}
      style={{ cursor: 'pointer' }}
    />
  );
}

export default RandomIndexImage;
