import React from 'react';
import { createRoot } from 'react-dom/client';
import RandomIndexImage from './components/RandomIndexImage.jsx';

// Mount RandomIndexImage when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountRandomImage);
} else {
  mountRandomImage();
}

function mountRandomImage() {
  const container = document.getElementById('random-index-image-root');
  if (container) {
    const root = createRoot(container);
    root.render(<RandomIndexImage />);
  }
}
