import React, { useState, useMemo } from 'react';
import SongRow from './SongRow.jsx';
import { SORT_BY_NAME, SORT_BY_ARTIST, SORT_ASC, SORT_DESC } from '../utils/constants.js';
import { sortSongs, filterSongs } from '../utils/songHelpers.js';

/**
 * Displays the song list table with sorting and filtering
 * @param {Object} props
 * @param {Array} props.songs - Array of song objects
 */
function SongTable({ songs }) {
  const [sortBy, setSortBy] = useState(SORT_BY_NAME);
  const [sortDir, setSortDir] = useState(SORT_ASC);
  const [showAcoustic, setShowAcoustic] = useState(false);

  // Memoize sorted and filtered songs to avoid unnecessary recalculation
  const displaySongs = useMemo(() => {
    const filtered = filterSongs(songs, showAcoustic);
    return sortSongs(filtered, sortBy, sortDir);
  }, [songs, sortBy, sortDir, showAcoustic]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === SORT_ASC ? SORT_DESC : SORT_ASC);
    } else {
      setSortBy(column);
      setSortDir(SORT_ASC);
    }
  };

  const handleSortByName = () => {
    handleSort(SORT_BY_NAME);
  };

  const handleSortByArtist = () => {
    handleSort(SORT_BY_ARTIST);
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
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Song</span>
                {sortBy === SORT_BY_NAME && <span>{sortDir === SORT_ASC ? '▲' : '▼'}</span>}
              </div>
            </th>
            <th className="sorter" onClick={handleSortByArtist}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Artist</span>
                {sortBy === SORT_BY_ARTIST && <span>{sortDir === SORT_ASC ? '▲' : '▼'}</span>}
              </div>
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
