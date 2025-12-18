import React from 'react';
import { createRoot } from 'react-dom/client';
import ParkCityGallery from './components/ParkCityGallery.jsx';

// Mount ParkCityGallery when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountGallery);
} else {
  mountGallery();
}

function mountGallery() {
  const container = document.getElementById('park-city-images-root');
  if (container) {
    const root = createRoot(container);
    root.render(<ParkCityGallery />);
  }
}
