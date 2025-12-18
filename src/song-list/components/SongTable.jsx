import React, { useState, useMemo } from 'react';
import SongRow from './SongRow.jsx';
import { SORT_BY_NAME, SORT_BY_ARTIST } from '../utils/constants.js';
import { sortSongs, filterSongs } from '../utils/songHelpers.js';

/**
 * Displays the song list table with sorting and filtering
 * @param {Object} props
 * @param {Array} props.songs - Array of song objects
 */
function SongTable({ songs }) {
  const [sortBy, setSortBy] = useState(SORT_BY_NAME);
  const [showAcoustic, setShowAcoustic] = useState(false);

  // Memoize sorted and filtered songs to avoid unnecessary recalculation
  const displaySongs = useMemo(() => {
    const filtered = filterSongs(songs, showAcoustic);
    return sortSongs(filtered, sortBy);
  }, [songs, sortBy, showAcoustic]);

  const handleSortByName = () => {
    setSortBy(SORT_BY_NAME);
  };

  const handleSortByArtist = () => {
    setSortBy(SORT_BY_ARTIST);
  };

  const handleToggleAcoustic = () => {
    setShowAcoustic(!showAcoustic);
  };

  return (
    <>
      <table className="slinfo">
        <tbody>
          <tr>
            <td>
              Click "Song" or "Artist" to sort the list.
            </td>
            <td className="showhide">
              <input
                type="checkbox"
                id="acoustic-toggle"
                checked={showAcoustic}
                onChange={handleToggleAcoustic}
              />
              <label htmlFor="acoustic-toggle">Include Acoustic-Only Songs</label>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="songlist" id="songlist">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th className="sorter" onClick={handleSortByName}>
              Song
            </th>
            <th className="sorter" onClick={handleSortByArtist}>
              Artist
            </th>
          </tr>
        </thead>
        <tbody>
          {displaySongs.map((song, index) => (
            <SongRow
              key={`${song.name}-${song.artist}`}
              rowNumber={index + 1}
              song={song}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default SongTable;
