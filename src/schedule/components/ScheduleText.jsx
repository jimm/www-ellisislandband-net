import React from 'react';
import { htmlUnescape } from '../utils/scheduleHelpers.js';
import { ACOUSTIC_NOTES, CUSTOM_FIELDS } from '../utils/constants.js';
import ScheduleInfo from './ScheduleInfo.jsx';

/**
 * Displays gig name, venue info, and description
 * Handles Markdown rendering in description
 * @param {Object} props
 * @param {Object} props.gig - Gig object
 * @param {string} props.nameClass - CSS class for name styling ('acoustic' or 'band')
 */
function ScheduleText({ gig, nameClass }) {
  const name = htmlUnescape(gig.name);
  const notes = gig.is_acoustic ? ACOUSTIC_NOTES : '';

  // Private events don't show description
  const description = gig.is_private_event
    ? ''
    : htmlUnescape(gig[CUSTOM_FIELDS.DESCRIPTION] || '');

  // Use marked.js to parse Markdown if available
  const descriptionHtml = window.marked
    ? window.marked.parseInline(description)
    : description;

  return (
    <div className="schedule-text">
      <div className="schedule-name">
        <span className={nameClass}>
          {name}
          {notes}
        </span>
      </div>
      <ScheduleInfo gig={gig} />
      <div
        className="schedule-description"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />
    </div>
  );
}

export default ScheduleText;
