import React from 'react';
import { createRoot } from 'react-dom/client';
import SongListApp from './components/SongListApp.jsx';

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSongList);
} else {
  initSongList();
}

function initSongList() {
  const container = document.getElementById('song-list-root');
  if (container) {
    const root = createRoot(container);
    root.render(<SongListApp />);
  } else {
    console.error('Song list container element not found');
  }
}

// Export for potential external use
export { initSongList };
