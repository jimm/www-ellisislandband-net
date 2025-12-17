import { MONTHS, CATEGORY_FULL_BAND, CATEGORY_ACOUSTIC, PRIVATE_EVENT_NAME, CUSTOM_FIELDS } from './constants.js';

/**
 * Unescapes HTML entities from BandHelper JSON data
 * @param {string} input - HTML-encoded string
 * @returns {string} Decoded string with double newlines converted to breaks
 */
export function htmlUnescape(input) {
  const doc = new DOMParser().parseFromString(input, "text/html");
  const text = doc.documentElement.textContent;
  return text.replaceAll("\n\n", "<br/><br/>");
}

/**
 * Parses date parts from ISO date string
 * @param {string} date - Date string in YYYY-MM-DD format
 * @returns {Object} Object with year, month, day properties
 */
export function parseDateParts(date) {
  const [year, month, day] = date.split('-');
  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
    monthName: MONTHS[Number(month)]
  };
}

/**
 * Extracts day name from date display string
 * @param {string} dateDisplay - Full date display string (e.g., "Fri, Dec 20, 2024")
 * @returns {string} Day name (e.g., "Fri")
 */
export function getDayName(dateDisplay) {
  return dateDisplay.split(' ')[0];
}

/**
 * Generates Google Maps search URL for an address
 * @param {string} address - Street address
 * @returns {string} Google Maps search URL
 */
export function getGoogleMapsUrl(address) {
  const cleanAddress = htmlUnescape(address);
  const searchTerm = encodeURIComponent(cleanAddress.replaceAll(/[.,]/g, " "));
  return `https://www.google.com/maps/search/?api=1&query=${searchTerm}`;
}

/**
 * Checks if gig has a poster image
 * @param {Object} gig - Gig object from BandHelper
 * @returns {boolean} True if poster exists
 */
export function hasPoster(gig) {
  return gig[CUSTOM_FIELDS.POSTER_IMAGE] !== undefined &&
         gig[CUSTOM_FIELDS.POSTER_IMAGE] !== "";
}

/**
 * Gets the poster image source URL
 * @param {Object} gig - Gig object from BandHelper
 * @returns {string} Image URL or path
 */
export function getPosterImageSrc(gig) {
  const url = gig[CUSTOM_FIELDS.POSTER_IMAGE];
  // BandHelper may wrap URLs in anchor tags
  if (url.startsWith("<a href=")) {
    return url.substring(9, url.indexOf('"', 9));
  }
  return `images/posters/${url}`;
}

/**
 * Determines if gig should be displayed on the schedule
 * @param {Object} gig - Gig object from BandHelper
 * @returns {boolean} True if gig should be shown
 */
export function shouldDisplayGig(gig) {
  return gig.category === CATEGORY_FULL_BAND ||
         gig.is_acoustic ||
         gig.is_private_event;
}

/**
 * Processes raw gig data from BandHelper
 * @param {Object} gig - Raw gig object
 * @returns {Object} Processed gig with additional computed properties
 */
export function processGig(gig) {
  return {
    ...gig,
    is_private_event: gig.name === PRIVATE_EVENT_NAME,
    is_acoustic: gig.category === CATEGORY_ACOUSTIC
  };
}

/**
 * Filters and processes schedule data
 * @param {Array} schedule - Raw schedule array from BandHelper
 * @returns {Array} Filtered and processed gigs
 */
export function processScheduleData(schedule) {
  return schedule
    .map(processGig)
    .filter(shouldDisplayGig);
}
