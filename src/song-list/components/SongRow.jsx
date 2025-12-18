import React from 'react';
import { ACOUSTIC_SUFFIX } from '../utils/constants.js';

/**
 * Displays a single song row with row number, name, and artist
 * @param {Object} props
 * @param {number} props.rowNumber - Display row number
 * @param {Object} props.song - Song object
 */
function SongRow({ rowNumber, song }) {
  const displayName = song.is_acoustic
    ? song.name + ACOUSTIC_SUFFIX
    : song.name;

  return (
    <tr>
      <td className="rownum">{rowNumber}</td>
      <td>{displayName}</td>
      <td>{song.artist}</td>
    </tr>
  );
}

export default SongRow;
