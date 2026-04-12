import React from 'react';
import { createRoot } from 'react-dom/client';
import ScheduleApp from './components/ScheduleApp.jsx';

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSchedule);
} else {
  initSchedule();
}

function initSchedule() {
  const container = document.getElementById('schedule-list');
  if (container) {
    const root = createRoot(container);
    root.render(<ScheduleApp />);
  }
}

// Export for potential external use
export { initSchedule };
