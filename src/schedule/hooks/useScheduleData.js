import { useState, useEffect } from 'react';
import { SCHEDULE_FILE, SCHEDULE_JSON_URL } from '../utils/constants.js';
import { processScheduleData } from '../utils/scheduleHelpers.js';

/**
 * Custom hook to fetch and process schedule data
 * Tries local file first, falls back to API if that fails
 *
 * @returns {Object} { gigs, loading, error }
 */
export function useScheduleData() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchScheduleData() {
      try {
        // Try local file first
        const data = await fetchFromSource(SCHEDULE_FILE);
        if (isMounted) {
          setGigs(processScheduleData(data));
          setLoading(false);
        }
      } catch (fileError) {
        console.warn('Failed to fetch from local file, trying API:', fileError);

        try {
          // Fallback to API
          const data = await fetchFromSource(SCHEDULE_JSON_URL);
          if (isMounted) {
            setGigs(processScheduleData(data));
            setLoading(false);
          }
        } catch (apiError) {
          console.error('Failed to fetch schedule from both sources:', apiError);
          if (isMounted) {
            setError(apiError);
            setLoading(false);
          }
        }
      }
    }

    fetchScheduleData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { gigs, loading, error };
}

/**
 * Fetch JSON data from a source URL
 * @param {string} url - URL to fetch from
 * @returns {Promise<Array>} Schedule data array
 */
async function fetchFromSource(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
