import { useCallback } from 'react';
import { useDataFetcher } from '../../shared/hooks/useDataFetcher.js';
import { SONG_LIST_FILE, SONG_LIST_JSON_URL } from '../utils/constants.js';
import { processSongListData } from '../utils/songHelpers.js';

/**
 * Custom hook to fetch and process song list data
 * Tries local file first, falls back to API if that fails
 *
 * @returns {Object} { songs, loading, error }
 */
export function useSongListData() {
  // Memoize the processor function to prevent unnecessary re-fetches
  const processData = useCallback((rawData) => processSongListData(rawData), []);

  const { data: songs, loading, error } = useDataFetcher(
    SONG_LIST_FILE,
    SONG_LIST_JSON_URL,
    processData
  );

  return { songs, loading, error };
}
