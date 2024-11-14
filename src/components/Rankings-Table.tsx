import React, { useState } from 'react';

interface TeamData {
  teamName: string;
  totalPoints: number;
  divisionNum: number;
  seasonYear: number;
  winCount: number;
  lossCount: number;
  tieCount: number;
  powerRanking: number;
}

interface StripedRowExampleProps {
  data: TeamData[];
}

// Define the sortConfig state to only allow valid keys from TeamData
type SortKey = keyof TeamData;

const StripedRowExample: React.FC<StripedRowExampleProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>(null);

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, sortConfig]);

  const handleSort = (key: SortKey) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        return { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <table className="rankings-table">
      <thead>
        <tr>
          <th onClick={() => handleSort('powerRanking')}>Rank {sortConfig?.key === 'powerRanking' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
          <th onClick={() => handleSort('teamName')}>Team Name {sortConfig?.key === 'teamName' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
          <th onClick={() => handleSort('divisionNum')}>Division {sortConfig?.key === 'divisionNum' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
          <th onClick={() => handleSort('seasonYear')}>Year {sortConfig?.key === 'seasonYear' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
          <th onClick={() => handleSort('winCount')}>Wins {sortConfig?.key === 'winCount' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
          <th onClick={() => handleSort('lossCount')}>Losses {sortConfig?.key === 'lossCount' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
          <th onClick={() => handleSort('tieCount')}>Ties {sortConfig?.key === 'tieCount' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
          <th onClick={() => handleSort('totalPoints')}>Total Points {sortConfig?.key === 'totalPoints' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.teamName}</td>
            <td>{item.divisionNum}</td>
            <td>{item.seasonYear}</td>
            <td>{item.winCount}</td>
            <td>{item.lossCount}</td>
            <td>{item.tieCount}</td>
            <td>{item.totalPoints}</td>
            <td>{item.powerRanking}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StripedRowExample;
