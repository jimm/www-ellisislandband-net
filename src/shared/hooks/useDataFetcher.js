import { useState, useEffect } from 'react';
import { fetchFromSource } from '../utils/dataFetcher.js';

/**
 * Generic hook to fetch and process data with local file fallback to API
 * Tries local file first, falls back to API if that fails
 *
 * @param {string} localFile - Local file URL/path
 * @param {string} apiUrl - Remote API URL
 * @param {Function} processData - Function to process the raw data
 * @returns {Object} { data, loading, error }
 */
export function useDataFetcher(localFile, apiUrl, processData) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        // Try local file first
        const rawData = await fetchFromSource(localFile);
        if (isMounted) {
          setData(processData(rawData));
          setLoading(false);
        }
      } catch (fileError) {
        console.warn('Failed to fetch from local file, trying API:', fileError);

        try {
          // Fallback to API
          const rawData = await fetchFromSource(apiUrl);
          if (isMounted) {
            setData(processData(rawData));
            setLoading(false);
          }
        } catch (apiError) {
          console.error('Failed to fetch from both sources:', apiError);
          if (isMounted) {
            setError(apiError);
            setLoading(false);
          }
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [localFile, apiUrl, processData]);

  return { data, loading, error };
}
