// Month names for date display
export const MONTHS = [
  '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// API and data source configuration
export const SCHEDULE_FILE = 'schedule.json';
export const SCHEDULE_JSON_URL = 'https://www.bandhelper.com/feed/calendar/64519?range=9';

// Gig category types
export const CATEGORY_FULL_BAND = 'Full Band Gig';
export const CATEGORY_ACOUSTIC = 'Acoustic Gig';

// Display constants
export const PRIVATE_EVENT_NAME = 'Private Event';
export const ACOUSTIC_NOTES = ' (Acoustic)';

// BandHelper custom field mappings
// These are the field IDs from BandHelper
export const CUSTOM_FIELDS = {
  DESCRIPTION: 'custom_cC99h9',    // Gig description (required, supports Markdown)
  POSTER_IMAGE: 'custom_CCMx5n',   // Poster image name or URL (optional)
  POSTER_ALT: 'custom_Kz3bz0',     // Poster alt text (optional)
  DISPLAY_PRIVATE: 'custom_7CpO7C' // Display as private flag (optional, numeric)
};
