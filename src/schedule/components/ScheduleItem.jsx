import React from 'react';
import ScheduleDate from './ScheduleDate.jsx';
import ScheduleText from './ScheduleText.jsx';
import PosterImage from './PosterImage.jsx';
import { hasPoster } from '../utils/scheduleHelpers.js';

/**
 * Displays a single gig entry with date, info, and optional poster
 * Layout changes based on whether poster exists (3-column vs 2-column)
 * @param {Object} props
 * @param {Object} props.gig - Gig object from BandHelper
 */
function ScheduleItem({ gig }) {
  const nameClass = gig.is_acoustic ? 'acoustic' : 'band';
  const showPoster = hasPoster(gig);

  if (showPoster) {
    // 3-column layout: date | text | poster
    return (
      <div className="row">
        <div className="column left">
          <ScheduleDate date={gig.date_start} dateDisplay={gig.date_display} />
        </div>
        <div className="column middle">
          <ScheduleText gig={gig} nameClass={nameClass} />
        </div>
        <div className="column right">
          <PosterImage gig={gig} />
        </div>
      </div>
    );
  }

  // 2-column layout: date | text
  return (
    <div className="row">
      <div className="column left">
        <ScheduleDate date={gig.date_start} dateDisplay={gig.date_display} />
      </div>
      <div className="column right">
        <ScheduleText gig={gig} nameClass={nameClass} />
      </div>
    </div>
  );
}

export default ScheduleItem;
