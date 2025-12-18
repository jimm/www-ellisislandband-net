import React from 'react';
import { GALLERY_SOURCES, IMAGE_DIR, ALT_TAG, NUM_COLS } from '../utils/constants.js';

/**
 * Gallery grid of Park City Music Hall photos
 * Displays images in a responsive table layout
 */
function ParkCityGallery() {
  // Group images into rows
  const rows = [];
  for (let i = 0; i < GALLERY_SOURCES.length; i += NUM_COLS) {
    rows.push(GALLERY_SOURCES.slice(i, i + NUM_COLS));
  }

  const handleImageClick = (src, alt) => {
    if (window.modal_image) {
      // Create a temporary image element to pass to modal
      const img = { src: IMAGE_DIR + src, alt };
      window.modal_image(img);
    }
  };

  return (
    <table width="100%">
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} style={{ verticalAlign: 'top' }}>
            {row.map((imageSrc, colIndex) => (
              <td key={colIndex} style={{ align: 'center', textAlign: 'center' }}>
                <img
                  className="myImg"
                  src={IMAGE_DIR + imageSrc}
                  alt={ALT_TAG}
                  onClick={() => handleImageClick(imageSrc, ALT_TAG)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ParkCityGallery;
