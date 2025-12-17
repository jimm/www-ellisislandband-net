import React from 'react';
import ScheduleItem from './ScheduleItem.jsx';

/**
 * Renders a list of schedule items in a table layout
 * @param {Object} props
 * @param {Array} props.gigs - Array of processed gig objects
 */
function ScheduleList({ gigs }) {
  if (!gigs || gigs.length === 0) {
    return (
      <div className="schedule-empty">
        <p>No upcoming gigs scheduled at this time.</p>
      </div>
    );
  }

  return (
    <table className="schedule">
      <tbody>
        {gigs.map((gig, index) => (
          <ScheduleItem key={`${gig.date_start}-${index}`} gig={gig} />
        ))}
      </tbody>
    </table>
  );
}

export default ScheduleList;
