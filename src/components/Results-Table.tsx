// ResultsTable.tsx
import React from 'react';
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
  url: string;
}

interface ResultsTableProps {
  data: RowData[];
  year?: string | null;  // Make optional
  name?: string | null;  // Make optional
  division?: string | null; // Make optional
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Home Team</th>
          <th>Home Points</th>
          <th>Away Team</th>
          <th>Away Points</th>
          <th>Division</th>
          <th>Results</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.date}</td>
            <td>{row.home_team}</td>
            <td>{row.home_points}</td>
            <td>{row.away_team}</td>
            <td>{row.away_points}</td>
            <td>{row.division}</td>
            <td>
                <Link to={`/results/meet/dominion-hills-vs-rolling-hills`}>View Meet</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
