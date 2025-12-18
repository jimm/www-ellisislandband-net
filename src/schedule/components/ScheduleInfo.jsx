import React from 'react';
import { getGoogleMapsUrl } from '../utils/scheduleHelpers.js';
import { htmlUnescape } from '../../shared/utils/htmlHelpers.js';

/**
 * Displays venue and address information for a gig
 * Shows Google Maps link for address
 * @param {Object} props
 * @param {Object} props.gig - Gig object
 */
function ScheduleInfo({ gig }) {
  const { date_display, venue, address, is_private_event } = gig;

  // Private events don't show venue/address info
  if (is_private_event) {
    return <div className="schedule-info">{date_display}</div>;
  }

  const venueText = venue ? ` @ ${htmlUnescape(venue)}` : '';
  const hasVenue = venueText !== '';

  return (
    <div className="schedule-info">
      {date_display}
      {venueText}
      {address && (
        <>
          {hasVenue && ', '}
          <a href={getGoogleMapsUrl(address)} target="_blank" rel="noopener noreferrer">
            {htmlUnescape(address)}
          </a>
        </>
      )}
    </div>
  );
}

export default ScheduleInfo;
