/**
 * Unescapes HTML entities from BandHelper JSON data
 * @param {string} input - HTML-encoded string
 * @param {boolean} convertNewlines - Whether to convert double newlines to <br/> tags
 * @returns {string} Decoded string
 */
export function htmlUnescape(input, convertNewlines = false) {
  const doc = new DOMParser().parseFromString(input, "text/html");
  const text = doc.documentElement.textContent;

  if (convertNewlines) {
    return text.replaceAll("\n\n", "<br/><br/>");
  }

  return text;
}
