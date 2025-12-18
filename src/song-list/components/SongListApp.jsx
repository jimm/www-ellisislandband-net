import React from 'react';
import { useSongListData } from '../hooks/useSongListData.js';
import SongTable from './SongTable.jsx';

/**
 * Main song list application component
 * Fetches data and handles loading/error states
 */
function SongListApp() {
  const { songs, loading, error } = useSongListData();

  if (loading) {
    return (
      <table className="songlist">
        <tbody>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;&nbsp;&nbsp;...loading...</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    );
  }

  if (error) {
    return (
      <div className="song-list-error">
        <p>Unable to load song list at this time. Please try again later.</p>
      </div>
    );
  }

  return <SongTable songs={songs} />;
}

export default SongListApp;
