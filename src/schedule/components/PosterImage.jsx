import React from 'react';
import { getPosterImageSrc } from '../utils/scheduleHelpers.js';
import { CUSTOM_FIELDS } from '../utils/constants.js';

/**
 * Displays poster image with modal integration
 * Calls existing modal_image function for full-screen viewing
 * @param {Object} props
 * @param {Object} props.gig - Gig object with poster information
 */
function PosterImage({ gig }) {
  const src = getPosterImageSrc(gig);
  const alt = gig[CUSTOM_FIELDS.POSTER_ALT] || '';

  const handleClick = (event) => {
    // Use existing modal_image function from image_modal.js if available
    if (window.modal_image) {
      window.modal_image(event.currentTarget);
    }
  };

  return (
    <img
      className="myImg schedule"
      src={src}
      alt={alt}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    />
  );
}

export default PosterImage;
