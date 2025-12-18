import React from 'react';
import { createRoot } from 'react-dom/client';
import ImageModal from './components/ImageModal.jsx';

// Mount ImageModal when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountModal);
} else {
  mountModal();
}

function mountModal() {
  const container = document.getElementById('image-modal-root');
  if (container) {
    const root = createRoot(container);
    root.render(<ImageModal />);
  }
}
