import React from 'react';
import { parseDateParts, getDayName } from '../utils/scheduleHelpers.js';

/**
 * Displays the date in a vertical layout with month, day name, and day number
 * @param {Object} props
 * @param {string} props.date - ISO date string (YYYY-MM-DD)
 * @param {string} props.dateDisplay - Formatted date string for display
 */
function ScheduleDate({ date, dateDisplay }) {
  const { monthName, day } = parseDateParts(date);
  const dayName = getDayName(dateDisplay);

  return (
    <div className="schedule-date">
      <div className="month">{monthName}</div>
      <div className="day-name">{dayName}</div>
      <div className="day">{day}</div>
    </div>
  );
}

export default ScheduleDate;
