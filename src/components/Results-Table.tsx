import React, { useState } from 'react';
import './Table.css';
import { Link } from 'react-router-dom';

interface RowData {
  date: string;
  year: string;
  home_team: string;
  home_points: string;
  away_team: string;
  away_points: string;
  division: number;
}

interface ResultsTableProps {
  data: RowData[];
  year?: string | null; // Optional
  name?: string | null; // Optional
  division?: string | null; // Optional
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof RowData; direction: 'asc' | 'desc' } | null>(null);

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

  const handleSort = (key: keyof RowData) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        // Toggle direction
        return { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' };
      }
      // Default to ascending order
      return { key, direction: 'asc' };
    });
  };

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th onClick={() => handleSort('date')}>Date</th>
          <th onClick={() => handleSort('home_team')}>Home Team</th>
          <th onClick={() => handleSort('home_points')}>Home Points</th>
          <th onClick={() => handleSort('away_team')}>Away Team</th>
          <th onClick={() => handleSort('away_points')}>Away Points</th>
          <th onClick={() => handleSort('division')}>Division</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            <td>{row.date}</td>
            <td>{row.home_team}</td>
            <td>{row.home_points}</td>
            <td>{row.away_team}</td>
            <td>{row.away_points}</td>
            <td>{row.division}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
