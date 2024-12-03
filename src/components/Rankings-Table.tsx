import React, { useState } from 'react';
import './Table.css'; // Ensure this file has the correct styles

interface TeamData {
  teamName: string;
  division: string;
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
  const [sortConfig, setSortConfig] = useState<{ key: keyof TeamData | 'rank'; direction: 'asc' | 'desc' } | null>(null);

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    const sorted = [...data].sort((a, b) => {
      const aValue = sortConfig.key === 'rank' ? data.indexOf(a) + 1 : a[sortConfig.key];
      const bValue = sortConfig.key === 'rank' ? data.indexOf(b) + 1 : b[sortConfig.key];

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
  const handleSort = (key: keyof TeamData | 'rank') => {
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
          <th title="Rank based on the sorting of data" onClick={() => handleSort('rank')}>Rank</th>
          <th title="Name of the team" onClick={() => handleSort('teamName')}>Team Name</th>
          <th title="Division the team competed in" onClick={() => handleSort('division')}>Division</th>
          <th title="Season year" onClick={() => handleSort('seasonYear')}>Year</th>
          <th title="Number of wins" onClick={() => handleSort('winCount')}>Wins</th>
          <th title="Number of losses" onClick={() => handleSort('lossCount')}>Losses</th>
          <th title="Number of ties" onClick={() => handleSort('tieCount')}>Ties</th>
          <th title="Dual Meet Points: Total points scored in Dual Meets as acknowledged by the NVSL" onClick={() => handleSort('dmPoints')}>DM Points</th>
          <th title="Divisional Relay Points: Total points scored at Divisional Relay Carnival as acknowledged by the NVSL" onClick={() => handleSort('drPoints')}>DR Points</th>
          <th title="Divisional Points: Total points scored at Divisionals using a modified scoring system" onClick={() => handleSort('dPoints')}>D Points</th>
          <th title="All Star Relay Points: Total points scored at All Star Relay Carnival as acknowledged by the NVSL" onClick={() => handleSort('arPoints')}>AR Points</th>
          <th title="All Star Points: Total points scored at All Stars using a modified scoring system" onClick={() => handleSort('aPoints')}>A Points</th>
          <th title="Total Points: Total points scored in one season as recognized by the NVSL (Dual Meets, Divisional Relays, All Star Relays)" onClick={() => handleSort('tPoints')}>T Points</th>
          <th title="Grand Total Points: Total points scored in one season from all possible meets" onClick={() => handleSort('gtPoints')}>GT Points</th>
          <th title="Power Ranking: A scoring system that calculates the strength of a team based on thier division, Grand Total Points, and losses" onClick={() => handleSort('powerRanking')}>Power Ranking</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((team, index) => (
          <tr key={index}>
            <td>{index + 1}</td> {/* Rank column */}
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
