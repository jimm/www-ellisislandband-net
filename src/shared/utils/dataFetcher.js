/**
 * Fetch JSON data from a source URL
 * @param {string} url - URL to fetch from
 * @returns {Promise<any>} Parsed JSON data
 * @throws {Error} If fetch fails or response is not ok
 */
export async function fetchFromSource(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
