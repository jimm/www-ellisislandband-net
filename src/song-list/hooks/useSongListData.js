import { useState, useEffect } from 'react';
import { SONG_LIST_FILE, SONG_LIST_JSON_URL } from '../utils/constants.js';
import { processSongListData } from '../utils/songHelpers.js';

/**
 * Custom hook to fetch and process song list data
 * Tries local file first, falls back to API if that fails
 *
 * @returns {Object} { songs, loading, error }
 */
export function useSongListData() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchSongListData() {
      try {
        // Try local file first
        const data = await fetchFromSource(SONG_LIST_FILE);
        if (isMounted) {
          setSongs(processSongListData(data));
          setLoading(false);
        }
      } catch (fileError) {
        console.warn('Failed to fetch from local file, trying API:', fileError);

        try {
          // Fallback to API
          const data = await fetchFromSource(SONG_LIST_JSON_URL);
          if (isMounted) {
            setSongs(processSongListData(data));
            setLoading(false);
          }
        } catch (apiError) {
          console.error('Failed to fetch song list from both sources:', apiError);
          if (isMounted) {
            setError(apiError);
            setLoading(false);
          }
        }
      }
    }

    fetchSongListData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { songs, loading, error };
}

/**
 * Fetch JSON data from a source URL
 * @param {string} url - URL to fetch from
 * @returns {Promise<Array>} Song list data array
 */
async function fetchFromSource(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
