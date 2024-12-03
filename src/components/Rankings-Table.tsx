import React, { useState } from 'react';
import './Table.css'; // Ensure this file has the correct styles

interface TeamData {
  teamName: string;
  division: number;
  seasonYear: string; // Use string to match consistency
  winCount: number;
  lossCount: number;
  tieCount: number;
  dmPoints: number | null;
  drPoints: number | null;
  dPoints: number | null;
  arPoints: number | null;
  aPoints: number | null;
  tPoints: number | null;
  gtPoints: number | null;
  powerRanking: number | null;
}

interface RankingsTableProps {
  data: TeamData[];
}

const RankingsTable: React.FC<RankingsTableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof TeamData; direction: 'asc' | 'desc' } | null>(null);

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Handle null or undefined values
      if (aValue == null || bValue == null) {
        return aValue == null ? 1 : -1; // Null values sorted last
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  // Handle column header click for sorting
  const handleSort = (key: keyof TeamData) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        // Toggle direction
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      // Set new sort key
      return { key, direction: 'asc' };
    });
  };

  // Render the table
  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th onClick={() => handleSort('teamName')}>Team Name</th>
          <th onClick={() => handleSort('division')}>Division</th>
          <th onClick={() => handleSort('seasonYear')}>Year</th>
          <th onClick={() => handleSort('winCount')}>Wins</th>
          <th onClick={() => handleSort('lossCount')}>Losses</th>
          <th onClick={() => handleSort('tieCount')}>Ties</th>
          <th onClick={() => handleSort('dmPoints')}>DM Points</th>
          <th onClick={() => handleSort('drPoints')}>DR Points</th>
          <th onClick={() => handleSort('dPoints')}>D Points</th>
          <th onClick={() => handleSort('arPoints')}>AR Points</th>
          <th onClick={() => handleSort('aPoints')}>A Points</th>
          <th onClick={() => handleSort('tPoints')}>T Points</th>
          <th onClick={() => handleSort('gtPoints')}>GT Points</th>
          <th onClick={() => handleSort('powerRanking')}>Power Ranking</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((team, index) => (
          <tr key={index}>
            <td>{team.teamName}</td>
            <td>{team.division}</td>
            <td>{team.seasonYear}</td>
            <td>{team.winCount}</td>
            <td>{team.lossCount}</td>
            <td>{team.tieCount}</td>
            <td>{team.dmPoints?.toFixed(1) || '0.0'}</td>
            <td>{team.drPoints?.toFixed(1) || '0.0'}</td>
            <td>{team.dPoints?.toFixed(1) || '0.0'}</td>
            <td>{team.arPoints?.toFixed(1) || '0.0'}</td>
            <td>{team.aPoints?.toFixed(1) || '0.0'}</td>
            <td>{team.tPoints?.toFixed(1) || '0.0'}</td>
            <td>{team.gtPoints?.toFixed(1) || '0.0'}</td>
            <td>{team.powerRanking?.toFixed(2) || '0.00'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankingsTable;
