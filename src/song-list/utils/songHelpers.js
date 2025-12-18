import { TAG_LEARNING, TAG_ACOUSTIC } from './constants.js';
import { htmlUnescape } from '../../shared/utils/htmlHelpers.js';

/**
 * Normalizes a string for sorting by removing leading articles
 * @param {string} str - String to normalize
 * @returns {string} Normalized string
 */
export function normalizeSortString(str) {
  // Use upper case for better UTF-8 character handling
  const upperStr = str.toUpperCase();
  const regex = /^(AN?|THE) /;
  const found = upperStr.match(regex);

  if (found != null) {
    return upperStr.substr(found[0].length);
  }

  return upperStr;
}

/**
 * Processes raw song data from BandHelper
 * @param {Object} entry - Raw song entry
 * @returns {Object|null} Processed song or null if should be filtered
 */
export function processSong(entry) {
  if (entry.type !== "song") {
    return null;
  }

  const tags = entry.tags ? entry.tags.split(", ") : [];

  // Filter out learning songs
  if (tags.includes(TAG_LEARNING)) {
    return null;
  }

  let name = htmlUnescape(entry.name);
  const artist = htmlUnescape(entry.artist);

  // Move trailing "The" to beginning
  if (name.match(/, The$/)) {
    name = `The ${name.substring(0, name.length - 5)}`;
  }

  return {
    name,
    artist,
    is_acoustic: tags.includes(TAG_ACOUSTIC)
  };
}

/**
 * Processes and filters song list data
 * @param {Array} songList - Raw song list from BandHelper
 * @returns {Array} Filtered and processed songs
 */
export function processSongListData(songList) {
  return songList
    .map(processSong)
    .filter(song => song !== null);
}

/**
 * Sorts songs by a given field
 * @param {Array} songs - Array of song objects
 * @param {string} sortBy - Field to sort by ('name' or 'artist')
 * @returns {Array} Sorted array of songs
 */
export function sortSongs(songs, sortBy) {
  // Create normalized lookup for sorting
  const normalized = {};
  songs.forEach(song => {
    normalized[song[sortBy]] = normalizeSortString(song[sortBy]);
  });

  return [...songs].sort((a, b) => {
    const aStr = normalized[a[sortBy]];
    const bStr = normalized[b[sortBy]];

    if (aStr < bStr) return -1;
    if (aStr > bStr) return 1;
    return 0;
  });
}

/**
 * Filters songs based on acoustic visibility
 * @param {Array} songs - Array of song objects
 * @param {boolean} showAcoustic - Whether to show acoustic-only songs
 * @returns {Array} Filtered songs
 */
export function filterSongs(songs, showAcoustic) {
  if (showAcoustic) {
    return songs;
  }

  return songs.filter(song => !song.is_acoustic);
}
