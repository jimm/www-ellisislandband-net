import { useCallback } from 'react';
import { useDataFetcher } from '../../shared/hooks/useDataFetcher.js';
import { SCHEDULE_FILE, SCHEDULE_JSON_URL } from '../utils/constants.js';
import { processScheduleData } from '../utils/scheduleHelpers.js';

/**
 * Custom hook to fetch and process schedule data
 * Tries local file first, falls back to API if that fails
 *
 * @returns {Object} { gigs, loading, error }
 */
export function useScheduleData() {
  // Memoize the processor function to prevent unnecessary re-fetches
  const processData = useCallback((rawData) => processScheduleData(rawData), []);

  const { data: gigs, loading, error } = useDataFetcher(
    SCHEDULE_FILE,
    SCHEDULE_JSON_URL,
    processData
  );

  return { gigs, loading, error };
}
