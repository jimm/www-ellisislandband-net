import React from 'react';
import { useScheduleData } from '../hooks/useScheduleData.js';
import ScheduleList from './ScheduleList.jsx';

/**
 * Main schedule application component
 * Fetches data and handles loading/error states
 */
function ScheduleApp() {
  const { gigs, loading, error } = useScheduleData();

  if (loading) {
    return (
      <div className="schedule-loading">
        <p>Loading schedule...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="schedule-error">
        <p>Unable to load schedule at this time. Please try again later.</p>
      </div>
    );
  }

  return <ScheduleList gigs={gigs} />;
}

export default ScheduleApp;
